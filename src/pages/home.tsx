import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex items-center py-1 text-6xl leading-none">
        <div>
          <Logo className="h-24 w-24" />
        </div>
        <div className="ml-3.5 flow-root font-bold">Podcasts</div>
      </div>
      <RSSForm />
    </div>
  );
}

function RSSForm() {
  const navigate = useNavigate();
  const [rssFeed, setRssFeed] = useState<string>('');

  function isValidUrl(string: string): boolean {
    try {
      new URL(string);
    } catch (e) {
      return false;
    }

    return true;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isValidUrl(rssFeed)) {
      navigate('/podcast?rss=' + encodeURIComponent(rssFeed));
    }
    event.preventDefault();
  }

  function handleImFeelingLucky(event: MouseEvent<HTMLButtonElement>) {
    const obsessedWithPodcast = 'https://podcasts.files.bbci.co.uk/p0742833.rss';
    navigate('/podcast?rss=' + encodeURIComponent(obsessedWithPodcast));
    event.preventDefault();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setRssFeed(event.target.value);
  }

  const disabled: boolean = !isValidUrl(rssFeed);

  return (
    <form className="mt-8 flex w-full max-w-2xl flex-col items-center" onSubmit={handleSubmit}>
      <div className="mb-8 w-full">
        <input
          className="inline-block h-16 w-full cursor-text rounded-lg border-[3px] border-solid border-gray-200 bg-white px-8 py-5 text-[1.22rem] leading-7"
          placeholder="Enter a podcast RSS feed…"
          type="url"
          value={rssFeed}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-[3.06rem] gap-[1.90rem]">
        <button
          className="items-start rounded bg-neutral-100 p-3.5 text-center leading-6 text-gray-300"
          type="submit"
          disabled={disabled}
        >
          Play Podcast
        </button>
        <button
          className="cursor-pointer items-start rounded bg-amber-300 p-3.5 text-center leading-6"
          onClick={handleImFeelingLucky}
        >
          I'm Feeling Lucky
        </button>
      </div>
    </form>
  );
}
