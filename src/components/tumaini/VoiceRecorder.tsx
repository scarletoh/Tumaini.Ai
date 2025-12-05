import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isAnalyzing?: boolean;
}

export function VoiceRecorder({ onRecordingComplete, isAnalyzing = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Start media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Audio level monitoring
      const updateLevel = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 255);
        }
        if (isRecording) {
          animationRef.current = requestAnimationFrame(updateLevel);
        }
      };
      updateLevel();

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* Recording visualization */}
      <div className="relative">
        <div
          className={cn(
            'w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300',
            isRecording
              ? 'bg-destructive/10 border-2 border-destructive'
              : 'bg-primary/10 border-2 border-primary'
          )}
        >
          {/* Pulse rings when recording */}
          {isRecording && (
            <>
              <div
                className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring"
                style={{ animationDelay: '0s' }}
              />
              <div
                className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring"
                style={{ animationDelay: '0.5s' }}
              />
            </>
          )}

          {isAnalyzing ? (
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          ) : isRecording ? (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-destructive rounded-full transition-all duration-100"
                  style={{
                    height: `${Math.max(8, audioLevel * 40 + Math.random() * 10)}px`,
                  }}
                />
              ))}
            </div>
          ) : (
            <Volume2 className="w-12 h-12 text-primary" />
          )}
        </div>
      </div>

      {/* Timer */}
      {isRecording && (
        <div className="text-2xl font-mono font-semibold text-foreground">
          {formatTime(recordingTime)}
        </div>
      )}

      {/* Instructions */}
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        {isAnalyzing
          ? 'Analyzing your voice patterns...'
          : isRecording
          ? 'Share how you\'re feeling today. Speak naturally for 30-60 seconds.'
          : 'Tap the microphone to start your daily check-in'}
      </p>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRecording ? (
          <Button
            size="lg"
            onClick={startRecording}
            disabled={isAnalyzing}
            className="rounded-full px-8 gap-2"
          >
            <Mic className="w-5 h-5" />
            Start Recording
          </Button>
        ) : (
          <Button
            size="lg"
            variant="destructive"
            onClick={stopRecording}
            className="rounded-full px-8 gap-2"
          >
            <Square className="w-5 h-5" />
            Stop Recording
          </Button>
        )}
      </div>
    </div>
  );
}
