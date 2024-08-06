import { useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PodcastItem } from '@/components/podcast-item';
import Spinner from '@/components/spinner';
import { useAppContext } from '@/store/app-state';
import { PodcastMeta } from '@/types';
import parsePodcast from '@/utils/parser';
import { useQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

const baseUrl = import.meta.env.BASE_URL;

const getPodcastByUrl = async (url: string): Promise<PodcastMeta | null> => {
  if (!url) return null;
  const res = await fetch(`https://podcast.nthung2112.workers.dev/?destination=${url}`);
  const result = await res.text();
  const data = await parsePodcast(result);
  return data as PodcastMeta;
};

export default function Podcast() {
  const [searchParams] = useSearchParams();
  const podcastUrl = searchParams.get('rss') || '';
  const parentRef = useRef<HTMLDivElement>(null);
  const parentOffsetRef = useRef(0);
  const { podcasts } = useAppContext();
  const podcastDetail = podcasts.find((pod) => pod.url === podcastUrl);

  const { data, isLoading } = useQuery({
    queryKey: ['getPodcast', podcastUrl],
    queryFn: async () => getPodcastByUrl(podcastUrl),
  });

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: data?.items.length || 1,
    estimateSize: () => 200,
    overscan: 5,
    scrollMargin: parentOffsetRef.current,
  });
  const items = virtualizer.getVirtualItems();
  const title = data?.title || podcastDetail?.title || 'New Podcast';

  return (
    <div>
      <div className="mb-8 grid grid-cols-5 gap-6 text-gray-800">
        <div className="relative rounded">
          <img
            className="h-auto w-full"
            src={data?.image || baseUrl + podcastDetail?.image}
            alt={title}
          />
        </div>

        <div className="col-start-2 col-end-[-1]">
          <h1 className="mb-3.5 text-[2.74rem] font-semibold leading-none">{title}</h1>
          <p
            className="line-clamp-6 break-words text-[1.22rem] leading-7"
            dangerouslySetInnerHTML={{
              __html: data?.description || podcastDetail?.description || '',
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div ref={parentRef}>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${items[0].start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              {items.map((virtualItem) => (
                <PodcastItem
                  key={virtualItem.key}
                  podcast={data}
                  item={data?.items[virtualItem.index]}
                  index={virtualItem.index}
                  ref={virtualizer.measureElement}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
