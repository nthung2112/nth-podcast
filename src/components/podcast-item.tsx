import { forwardRef } from 'react';
import IconPlay from '@/components/icons/play-circle';
import usePlayerStore from '@/store/player-store';
import { PodcastEpisode, PodcastMeta } from '@/types';

type Props = {
  podcast?: PodcastMeta | null;
  item?: PodcastEpisode;
  index: number;
};

export type Ref = HTMLDivElement;

export const PodcastItem = forwardRef<Ref, Props>(({ item, podcast, index }, ref) => {
  const setActiveEpisode = usePlayerStore((state) => state.setActiveEpisode);
  if (!item) return null;

  return (
    <div className="relative flex pb-8 pt-5" ref={ref} data-index={index}>
      <div className="mr-5">
        <button
          className="-mx-2 -mt-1.5 inline-block cursor-pointer items-start rounded-full p-2"
          onClick={() => {
            setActiveEpisode(podcast!, item);
          }}
        >
          <IconPlay className="h-10 w-10" />
        </button>
      </div>
      <div>
        <h3 className="mb-1 text-[1.49rem] font-semibold leading-7">{item.title}</h3>
        <div className="mb-1 flex text-base text-slate-500">
          <span>
            {new Date(item.published!).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="mx-1.5">·</span>
          <span>{item.itunes_duration}</span>
        </div>
        <div>
          <p
            className="break-words text-[1.10rem] leading-6"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      </div>
    </div>
  );
});
