import usePlayerStore from '@/store/player-store';

import IconVolumeDown from '../icons/volume-down';
import IconVolumeMute from '../icons/volume-mute';
import IconVolumeOff from '../icons/volume-off';
import IconVolumeUp from '../icons/volume-up';
import Slider from '../slider';

export default function VolumeControls() {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const isMuted = volume === 0;

  function changeVolume(newValues: number[]) {
    setVolume(newValues[0]);
  }

  function mute() {
    if (volume !== 0) {
      setVolume(0);
    }
  }

  return (
    <div className="flex w-full max-w-[230px] items-center justify-end pl-5 pr-7">
      <button className="mx-1 cursor-pointer items-start rounded-full p-2" onClick={mute}>
        <VolumeIcon isMuted={isMuted} volume={volume} />
      </button>
      <div className="flex h-8 w-full items-center">
        <Slider
          onValueChange={changeVolume}
          min={0}
          max={1}
          step={0.01}
          value={[isMuted ? 0 : volume]}
        />
      </div>
    </div>
  );
}

interface VolumeIconProps {
  isMuted: boolean;
  volume: number;
}

function VolumeIcon({ isMuted, volume }: VolumeIconProps) {
  if (isMuted) {
    return <IconVolumeOff className="h-6 w-6" />;
  }

  if (volume === 0) {
    return <IconVolumeMute className="h-6 w-6" />;
  }

  if (volume < 0.66) {
    // Adjusted the condition
    return <IconVolumeDown className="h-6 w-6" />;
  }

  return <IconVolumeUp className="h-6 w-6" />;
}
