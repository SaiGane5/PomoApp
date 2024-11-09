import React, { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerStatus, TimerMode } from '../types';

interface TimerProps {
  minutes: number;
  seconds: number;
  status: TimerStatus;
  mode: TimerMode;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export default function Timer({
  minutes,
  seconds,
  status,
  mode,
  onStart,
  onPause,
  onReset,
  onSkip,
}: TimerProps) {
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const sessionCompleteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (status === 'running') {
      tickAudioRef.current?.play();
    } else {
      tickAudioRef.current?.pause();
    }
  }, [status]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && status === 'running') {
      sessionCompleteAudioRef.current?.play();
    }
  }, [minutes, seconds, status]);

  const getBgColor = () => {
    switch (mode) {
      case 'work':
        return 'bg-rose-500 dark:bg-rose-600';
      case 'shortBreak':
        return 'bg-emerald-500 dark:bg-emerald-600';
      case 'longBreak':
        return 'bg-blue-500 dark:bg-blue-600';
    }
  };

  return (
    <div className={`rounded-2xl ${getBgColor()} p-8 shadow-lg`}>
      <audio
        ref={tickAudioRef}
        src="https://github.com/SaiGane5/PomoApp/raw/refs/heads/main/src/components/450509__abyeditsound__clockticksound_01.wavv"
        loop
      />
      <audio
        ref={sessionCompleteAudioRef}
        src="https://github.com/SaiGane5/PomoApp/raw/refs/heads/main/src/components/achieve.wav"
      />

      <div className="text-center">
        <div className="mb-8 text-7xl font-bold text-white">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-4">
          {status === 'running' ? (
            <button
              onClick={onPause}
              className="rounded-full bg-white/20 p-4 text-white hover:bg-white/30 transition-colors"
            >
              <Pause size={24} />
            </button>
          ) : (
            <button
              onClick={onStart}
              className="rounded-full bg-white/20 p-4 text-white hover:bg-white/30 transition-colors"
            >
              <Play size={24} />
            </button>
          )}

          <button
            onClick={onReset}
            className="rounded-full bg-white/20 p-4 text-white hover:bg-white/30 transition-colors"
          >
            <RotateCcw size={24} />
          </button>

          <button
            onClick={onSkip}
            className="rounded-full bg-white/20 p-4 text-white hover:bg-white/30 transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
