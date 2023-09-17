import { useRef } from 'react';
import { PodcastEpisode, PodcastMeta } from '@/types';

import { useAudioElement } from './use-audio-element';
import PlayerControls from './player-controls';
import VolumeControls from './volume-controls';
import PlayerTitle from './player-title';

type PlayerBarProps = {
  episode: PodcastEpisode;
  podcast: PodcastMeta;
};

export default function PlayBar({ episode, podcast }: PlayerBarProps) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const audioUrl = episode.enclosures?.[0]?.url;

  useAudioElement({ audioElement });

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/[0.98] text-gray-800 shadow-[0_-1px_6px_rgba(0,0,0,0.1),0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="absolute inset-x-5 -top-16 flex  justify-center">
        <audio
          src={audioUrl}
          ref={audioElement}
          loop={false}
          controls
          className="hidden h-14 w-96 shadow-md [&::-webkit-media-controls-enclosure]:rounded [&::-webkit-media-controls-enclosure]:bg-yellow-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr_1fr]">
        <div className="hidden justify-start md:flex">
          <PlayerTitle podcast={podcast} episode={episode} />
        </div>
        <div className="flex items-center justify-center">
          <PlayerControls audioElement={audioElement.current} />
        </div>
        <div className="hidden items-center justify-end md:flex">
          <VolumeControls />
        </div>
      </div>
    </div>
  );
}
