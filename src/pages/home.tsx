import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <div className="items-center flex flex-col mt-8">
      <div className="items-center flex text-6xl leading-none py-1">
        <div>
          <Logo className="h-24 w-24" />
        </div>
        <div className="flow-root font-bold ml-3.5">Podcasts</div>
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
    const obsessedWithPodcast =
      'https://podcasts.files.bbci.co.uk/p0742833.rss';
    navigate('/podcast?rss=' + encodeURIComponent(obsessedWithPodcast));
    event.preventDefault();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setRssFeed(event.target.value);
  }

  const disabled: boolean = !isValidUrl(rssFeed);

  return (
    <form
      className="w-full max-w-2xl items-center flex flex-col mt-8"
      onSubmit={handleSubmit}
    >
      <div className="mb-8 w-full">
        <input
          className="w-full h-16 bg-white cursor-text inline-block text-[1.22rem] leading-7 py-5 px-8 border-[3px] border-gray-200 border-solid rounded-lg"
          placeholder="Enter a podcast RSS feed…"
          type="url"
          value={rssFeed}
          onChange={handleChange}
        />
      </div>
      <div className="gap-[1.90rem] grid grid-cols-2 grid-rows-[3.06rem]">
        <button
          className="items-start bg-neutral-100 text-gray-300 text-[1.10rem] leading-6 text-center rounded p-3.5"
          type="submit"
          disabled={disabled}
        >
          Play Podcast
        </button>
        <button
          className="items-start bg-amber-300 cursor-pointer text-[1.10rem] leading-6 text-center rounded p-3.5"
          onClick={handleImFeelingLucky}
        >
          I'm Feeling Lucky
        </button>
      </div>
    </form>
  );
}
