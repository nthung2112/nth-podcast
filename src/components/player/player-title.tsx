import { PodcastEpisode, PodcastMeta } from '@/types';
import { Link } from 'react-router-dom';

type PlayerTitleProps = {
  episode: PodcastEpisode;
  podcast: PodcastMeta;
};

export default function PlayerTitle({ episode, podcast }: PlayerTitleProps) {
  const to = {
    pathname: '/podcast',
    search: '?rss=' + encodeURIComponent(episode.enclosures?.[0]?.url),
  };

  return (
    <Link
      to={to}
      className="m-2 grid w-full cursor-pointer grid-cols-[3.5rem_1fr] gap-3 rounded p-2"
    >
      <div className="self-center rounded-sm bg-neutral-100">
        <img src={podcast.image} className="h-14 w-14" />
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[1.09rem] font-semibold leading-6">
          {episode.title}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.99rem] leading-5 text-slate-500">
          {podcast.title}
        </div>
      </div>
    </Link>
  );
}
