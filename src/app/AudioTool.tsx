import { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Download, RefreshCw } from 'lucide-react';
import { Button } from './components/ui/button';
import { Slider } from './components/ui/slider';
import { Card } from './components/ui/card';

// Pehle 'export default function AudioTool()' tha, ab ye daalo:
export default function AudioTool({ onBack }: { onBack: () => void }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85); // Default slowed to 85%
  const [reverbIntensity, setReverbIntensity] = useState(0.4); // 0-1 range
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const convolverNodeRef = useRef<ConvolverNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevSpeedRef = useRef(0.85);


  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);
  // Playback Speed ko bina marker jump kiye live update karne ke liye
  useEffect(() => {
    if (isPlaying && sourceNodeRef.current && audioContextRef.current && startTimeRef.current !== null) {
      // 1. Purani speed ke hisaab se ab tak ki exact position 'lock' karein
      const realTimeElapsed = audioContextRef.current.currentTime - startTimeRef.current;
      const currentActualPos = pauseTimeRef.current + (realTimeElapsed * prevSpeedRef.current);

      // 2. Clock reset karein taaki nayi speed sirf aage ke time par apply ho
      pauseTimeRef.current = currentActualPos;
      startTimeRef.current = audioContextRef.current.currentTime;

      // 3. Audio ki speed badlein
      sourceNodeRef.current.playbackRate.value = playbackSpeed;
    }

    // Agli baar ke liye current speed save karein
    prevSpeedRef.current = playbackSpeed;
  }, [playbackSpeed, isPlaying]);

  // Reverb (Wet Gain) ko live update karne ke liye
  useEffect(() => {
    if (wetGainRef.current) {
      wetGainRef.current.gain.value = reverbIntensity;
    }
  }, [reverbIntensity]);

  // Create reverb impulse response
  const createReverbImpulse = (duration: number, decay: number): AudioBuffer => {
    const context = audioContextRef.current!;
    const length = context.sampleRate * duration;
    const impulse = context.createBuffer(2, length, context.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }

    return impulse;
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setAudioFile(file);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
      setDuration(audioBuffer.duration);
      pauseTimeRef.current = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error loading audio file:', error);
      alert('Error loading audio file. Please try a different file.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Play/Pause functionality (Precision Sync Fix)
  const togglePlayPause = () => {
    if (!audioBufferRef.current || !audioContextRef.current) return;

    if (isPlaying) {
      // PAUSE LOGIC: Exact position calculate karein
      if (sourceNodeRef.current && startTimeRef.current !== null) {
        const realTimeElapsed = audioContextRef.current.currentTime - startTimeRef.current;
        // Speed ko multiply karna zaroori hai sync ke liye
        const exactPosition = pauseTimeRef.current + (realTimeElapsed * playbackSpeed);

        pauseTimeRef.current = exactPosition;
        setCurrentTime(exactPosition); // Marker ko wahin rok dega

        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // PLAY LOGIC
      playAudio();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    sourceNodeRef.current?.stop();
    sourceNodeRef.current = null;
    setIsPlaying(false);
    pauseTimeRef.current = 0;
    setCurrentTime(0);
  };


  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioBufferRef.current || !audioContextRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekTime = percentage * audioBufferRef.current.duration;

    pauseTimeRef.current = seekTime;
    setCurrentTime(seekTime);

    if (isPlaying) {
      sourceNodeRef.current?.stop();
      playAudio();
    }
  };

  const playAudio = () => {
    if (!audioBufferRef.current || !audioContextRef.current) return;

    const context = audioContextRef.current;

    // Create source
    const source = context.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.playbackRate.value = playbackSpeed;

    // Create reverb (convolver)
    const convolver = context.createConvolver();
    convolver.buffer = createReverbImpulse(2, 3);

    // Create dry and wet gains for reverb mix
    const dryGain = context.createGain();
    const wetGain = context.createGain();

    dryGain.gain.value = 1 - reverbIntensity;
    wetGain.gain.value = reverbIntensity;

    // Create master gain
    const masterGain = context.createGain();
    masterGain.gain.value = 1.3;

    // Connect the audio graph
    // Dry signal: source -> dryGain -> masterGain -> destination
    source.connect(dryGain);
    dryGain.connect(masterGain);

    // Wet signal: source -> convolver -> wetGain -> masterGain -> destination
    source.connect(convolver);
    convolver.connect(wetGain);
    wetGain.connect(masterGain);

    masterGain.connect(context.destination);

    // Store references
    sourceNodeRef.current = source;
    convolverNodeRef.current = convolver;
    dryGainRef.current = dryGain;
    wetGainRef.current = wetGain;
    gainNodeRef.current = masterGain;

    // Start playback from pause position
    startTimeRef.current = context.currentTime;
    source.start(0, pauseTimeRef.current);

    // Handle end of playback
    source.onended = () => {
      const realTimeElapsed = context.currentTime - startTimeRef.current;
      const finalPosition = pauseTimeRef.current + (realTimeElapsed * playbackSpeed);

      // Check karein ki kya gaana sach mein khatam hua hai
      if (finalPosition >= audioBufferRef.current!.duration - 0.1) {
        if (isLooping) {
          // MANUAL LOOP: Sab kuch reset karke firse chalao
          pauseTimeRef.current = 0;
          setCurrentTime(0);
          playAudio();
        } else {
          // Normal stop
          setIsPlaying(false);
          pauseTimeRef.current = 0;
          setCurrentTime(0);
        }
      }
    };
  };

  // Live parameters update (Bina gaana roke)
  useEffect(() => {
    // 1. Speed update
    if (sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = playbackSpeed;
    }
    // 2. Reverb update
    if (wetGainRef.current) {
      wetGainRef.current.gain.value = reverbIntensity;
    }
  }, [playbackSpeed, reverbIntensity]);
  const drawWaveform = (buffer: AudioBuffer) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const data = buffer.getChannelData(0);

    // Yahan math theek kiya hai: bars ko poore width par spread karne ke liye
    const barWidth = 4;
    const barCount = width / barWidth;
    const step = Math.floor(data.length / barCount);
    const amp = height / 2;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#f472b6');
    gradient.addColorStop(1, '#a78bfa');
    ctx.fillStyle = gradient;

    for (let i = 0; i < barCount; i++) {
      let max = 0;
      for (let j = 0; j < step; j++) {
        const datum = Math.abs(data[i * step + j]);
        if (datum > max) max = datum;
      }

      const barHeight = Math.max(4, max * amp * 1.5);
      const x = i * barWidth; // X-coordinate ab sahi spread hoga

      ctx.beginPath();
      // Bars ke beech 2px ka gap rakha hai (2px bar + 2px gap)
      ctx.roundRect(x, amp - barHeight / 2, 2, barHeight, 5);
      ctx.fill();
    }
  };



  // Jab gaana upload ho jaye, tab drawing trigger karein
  useEffect(() => {
    if (audioBufferRef.current) {
      drawWaveform(audioBufferRef.current);
    }
  }, [audioBufferRef.current]);



  // Update current time (Playhead Sync Fix)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (audioContextRef.current && audioBufferRef.current && startTimeRef.current !== null) {
        const realTimeElapsed = audioContextRef.current.currentTime - startTimeRef.current;
        const currentSongTime = pauseTimeRef.current + (realTimeElapsed * playbackSpeed);

        // Agar gana khatam ho gaya hai
        if (currentSongTime >= audioBufferRef.current.duration) {
          if (isLooping) {
            // Loop ON hai toh restart karo
            pauseTimeRef.current = 0;
            startTimeRef.current = audioContextRef.current.currentTime;
            setCurrentTime(0);
          } else {
            // -- YAHAN ASLI FIX HAI --
            setIsPlaying(false);
            pauseTimeRef.current = 0; // Agli baar play karne par shuru se chale isliye 0 kar diya
            setCurrentTime(0);        // Marker ko bhi 0 par le aao

            if (sourceNodeRef.current) {
              sourceNodeRef.current.stop();
              sourceNodeRef.current = null;
            }
          }
        } else {
          setCurrentTime(currentSongTime);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, isLooping]);



  // Download processed audio
  const handleDownload = async () => {
    if (!audioBufferRef.current || !audioContextRef.current) return;

    setIsProcessing(true);

    try {
      const originalBuffer = audioBufferRef.current;
      const originalSampleRate = originalBuffer.sampleRate;

      // Create offline context with adjusted duration for playback speed
      const duration = originalBuffer.duration / playbackSpeed;
      const offlineContext = new OfflineAudioContext(
        originalBuffer.numberOfChannels,
        duration * originalSampleRate,
        originalSampleRate
      );

      // Create source
      const source = offlineContext.createBufferSource();
      source.buffer = originalBuffer;
      source.playbackRate.value = playbackSpeed;

      // Create reverb
      const convolver = offlineContext.createConvolver();
      convolver.buffer = createReverbImpulse(2, 3);

      // Create dry and wet gains
      const dryGain = offlineContext.createGain();
      const wetGain = offlineContext.createGain();

      dryGain.gain.value = 1 - reverbIntensity;
      wetGain.gain.value = reverbIntensity;

      // Create master gain
      const masterGain = offlineContext.createGain();
      masterGain.gain.value = 1.3;

      // Connect the audio graph
      source.connect(dryGain);
      dryGain.connect(masterGain);

      source.connect(convolver);
      convolver.connect(wetGain);
      wetGain.connect(masterGain);

      masterGain.connect(offlineContext.destination);

      // Start rendering
      source.start(0);
      const renderedBuffer = await offlineContext.startRendering();

      // Convert to WAV
      const wav = audioBufferToWav(renderedBuffer);
      const blob = new Blob([wav], { type: 'audio/wav' });

      // Download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${audioFile?.name.replace(/\.[^/.]+$/, '')}_slowed_reverb.wav`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Error processing audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const numberOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numberOfChannels * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);

    // Write WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length, true);

    // Write audio data
    const channels = [];
    for (let i = 0; i < numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, channels[channel][i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return arrayBuffer;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetAudio = () => {
    sourceNodeRef.current?.stop();
    setIsPlaying(false);
    setAudioFile(null);
    audioBufferRef.current = null;
    pauseTimeRef.current = 0;
    setCurrentTime(0);
    setDuration(0);
    setPlaybackSpeed(0.8);
    setReverbIntensity(0.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
<Card className="w-full max-w-[95%] md:max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl overflow-hidden">
  <div className="p-4 sm:p-10 space-y-8"> 
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* Aapka Logo (Public folder se uthayega) */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="/logo.png"
                alt="Solo Artist Logo"
                className="relative w-20 h-20 object-contain rounded-full border-2 border-slate-800"
              />
            </div>

            {/* Brand Name with Gradient */}
            <div className="text-center">
              <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tighter sm:text-5xl">
                KICK MY SONG
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-medium tracking-widest uppercase opacity-70">
                Slowed + Reverb
              </p>
            </div>
          </div>


          {/* Upload Section */}
          {!audioFile ? (
            <div className="space-y-4">
              <label
                htmlFor="audio-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-slate-400" />
                  <p className="mb-2 text-sm text-slate-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-500">MP3, WAV, OGG, M4A (max 50MB)</p>
                </div>
                <input
                  id="audio-upload"
                  type="file"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{audioFile.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetAudio}
                  className="ml-4 text-slate-400 hover:text-slate-200"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {/* Spectral Timeline (Nayi Progress Bar) */}
              <div
                className="relative w-full h-24 bg-slate-800/30 rounded-lg overflow-hidden cursor-pointer border border-slate-700/50 group"
                onClick={handleSeek}
              >
                {/* Waveform Canvas */}
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={100}
                  className="w-full h-full opacity-40 transition-opacity group-hover:opacity-60"
                />

                {/* Played Audio Overlay (Halka Transparent Pink) */}
                <div
                  className="absolute top-0 left-0 h-full bg-purple-500/10 backdrop-blur-[1px] pointer-events-none"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />

                {/* Marker (Vertical Pink Line) */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.8)] pointer-events-none"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                />
              </div>


              {/* Controls */}
              <div className="space-y-6">
                {/* Speed Control */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-tight">
                      Playback Speed
                    </label>

                    {/* Right Side: Current Speed + Reset Button */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-pink-500 font-mono font-bold">
                        CURRENT: {Math.round(playbackSpeed * 100)}%
                      </span>
                      <button
                        onClick={() => setPlaybackSpeed(1.0)}
                        className={`text-[10px] px-2 py-1 rounded border transition-all active:scale-95 ${playbackSpeed === 1.0
                            ? "text-slate-600 border-slate-800 bg-slate-900/50 cursor-default"
                            : "text-pink-400 border-pink-500/30 bg-pink-500/5 hover:bg-pink-500/10"
                          }`}
                      >
                        {playbackSpeed === 1.0 ? "ORIGINAL" : "RESET TO 1.0x"}
                      </button>
                    </div>
                  </div>

                  <Slider
                    value={[playbackSpeed]}
                    onValueChange={([value]) => {
                    
                      if (value > 0.98 && value < 1.02) setPlaybackSpeed(1.0);
                      else setPlaybackSpeed(value);
                    }}
                    min={0} 
                    max={2.0}
                    step={0.01}
                    className="w-full"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono px-1">
                    <span>0%</span>
                    <span className={playbackSpeed === 1.0 ? "text-pink-500 font-bold scale-110 transition-all" : ""}>
                      100% (NORMAL)
                    </span>
                    <span>200%</span>
                  </div>
                </div>
                {/* Reverb Control */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-300">Reverb Intensity</label>
                    <span className="text-sm text-slate-400">{Math.round(reverbIntensity * 100)}%</span>
                  </div>
                  <Slider
                    value={[reverbIntensity]}
                    onValueChange={([value]) => setReverbIntensity(value)}
                    min={0}
                    max={2.0}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>0%</span>
                    <span>200%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Naya 3-Button System) */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="grid grid-cols-3 gap-2">
                  {/* STOP BUTTON */}
                  <Button
                    onClick={handleStop}
                    variant="outline"
                    className="flex-1 text-[10px] sm:text-sm border-slate-700 text-black hover:bg-slate-800"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Stop
                  </Button>

                  {/* PAUSE / PLAY BUTTON */}
                  <Button
                    onClick={togglePlayPause}
                    className="flex-1 text-[10px] sm:text-sm bg-slate-100 text-black hover:bg-white"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>

                  {/* LOOP BUTTON */}
                  <Button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`flex-1 text-[10px] sm:text-sm transition-all ${isLooping ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.5)]' : 'bg-slate-800 text-slate-400'}`}
                  >
                    Loop: {isLooping ? 'ON' : 'OFF'}
                  </Button>
                </div>

                {/* Download Button niche line mein rahega */}
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full bg-black text-white border-none hover:bg-gray-800 py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Final Track
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800">
            Stay connect with me. Thanks for using our services. Lots of love.
          </div>
        </div>
      </Card>
    </div>
  );
}