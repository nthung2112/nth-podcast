import { useState } from 'react';
import usePlayerStore from '@/store/player-store';

import Slider from '../slider';

function Time({ seconds }: { seconds: number }) {
  if (!seconds) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return pad(mins) + ':' + pad(secs);
}

export default function PlaybackBar({ audioElement }: { audioElement: HTMLAudioElement | null }) {
  const duration = usePlayerStore((state) => state.duration);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [currentTimePos, setCurrentTimePos] = useState(currentTime);

  function handleChange(values: number[]) {
    setCurrentTimePos(values[0]);
  }

  function handlePointerDown() {
    setIsDraggingProgress(true);
  }

  function handlePointerUp() {
    setIsDraggingProgress(false);

    if (!audioElement) {
      return;
    }

    if (
      audioElement.readyState === audioElement.HAVE_NOTHING ||
      audioElement.readyState === audioElement.HAVE_METADATA
    ) {
      setCurrentTimePos(0);
    } else {
      audioElement.currentTime = currentTimePos;
    }
  }

  const time = isDraggingProgress ? currentTimePos : currentTime;

  return (
    <div className="grid grid-cols-[40px_1fr_40px] items-center gap-3">
      <div className="text-center text-[0.81rem] text-slate-500">
        <Time seconds={currentTime} />
      </div>
      <div className="flex h-8 items-center">
        <Slider
          min={0}
          max={duration || 3600}
          step={1}
          value={[time]}
          onValueChange={handleChange}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      </div>
      <div className="text-center text-[0.81rem] text-slate-500">
        <Time seconds={duration} />
      </div>
    </div>
  );
}
