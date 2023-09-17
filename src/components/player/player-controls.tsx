import usePlayerStore from '@/store/player-store';

import ForwardIcon from '../icons/forward';
import IconPlay from '../icons/play';
import IconSeekBackward from '../icons/seek-backward';
import IconSeekForward from '../icons/seek-forward';
import IconSkipPrevious from '../icons/skip-previous';
import IconPause from '../icons/pause';
import PlaybackBar from './playback-bar';

export default function PlayerControls({
  audioElement,
}: {
  audioElement: HTMLAudioElement | null;
}) {
  const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

  const status = usePlayerStore((state) => state.status);
  const duration = usePlayerStore((state) => state.duration);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const totalEpisode = usePlayerStore((state) => state.totalEpisode);
  const nextEpisode = usePlayerStore((state) => state.nextEpisode);
  const prevEpisode = usePlayerStore((state) => state.prevEpisode);

  const disabled = status === 'disabled' || duration === 0;

  function handlePlayPause() {
    if (status === 'pause') {
      setPlayerStatus('play');
    } else {
      setPlayerStatus('pause');
    }
  }
  function seekBackward() {
    if (!audioElement) {
      return;
    }

    if (audioElement.currentTime > 15) {
      audioElement.currentTime = audioElement.currentTime - 15;
    } else {
      audioElement.currentTime = 0;
    }
  }

  function seekForward() {
    if (!audioElement) {
      return;
    }
    if (audioElement.currentTime < audioElement.duration - 30) {
      audioElement.currentTime = audioElement.currentTime + 30;
    } else {
      audioElement.currentTime = audioElement.duration;
    }
  }

  return (
    <div className="flex w-full flex-col px-5">
      <div className="flex items-center justify-center pt-1.5">
        <button
          className="mx-1 rounded-full p-2 [&[disabled]>svg]:fill-slate-300"
          onClick={prevEpisode}
          disabled={disabled || currentIndex >= totalEpisode - 1}
        >
          <IconSkipPrevious className="h-6 w-6" />
        </button>
        <button
          className="mx-1 rounded-full p-2 [&[disabled]>svg]:fill-slate-300"
          onClick={seekBackward}
          disabled={disabled}
        >
          <IconSeekBackward className="h-8 w-8" />
        </button>
        <button
          className=" mx-3.5 rounded-full bg-cyan-400 disabled:bg-transparent [&[disabled]>svg]:fill-slate-300"
          onClick={handlePlayPause}
          disabled={disabled}
        >
          {status === 'play' ? (
            <IconPause className="h-14 w-14" />
          ) : (
            <IconPlay className="h-14 w-14" />
          )}
        </button>
        <button
          className="mx-1 rounded-full p-2 [&[disabled]>svg]:fill-slate-300"
          onClick={seekForward}
          disabled={disabled}
        >
          <IconSeekForward className="h-8 w-8" />
        </button>
        <button
          className="mx-1 rounded-full p-2 [&[disabled]>svg]:fill-slate-300"
          onClick={nextEpisode}
          disabled={currentIndex <= 0}
        >
          <ForwardIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="pb-1.5">
        <PlaybackBar audioElement={audioElement} />
      </div>
    </div>
  );
}
