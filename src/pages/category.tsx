import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '@/store/app-state';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { podcasts, categories } = useAppContext();

  const categoryPodcasts = podcasts.filter((pod) => pod.category === categoryId) ?? [];
  const category = categories.find((pod) => pod.slug === categoryId)!;

  return (
    <>
      <h1 className="mb-16 text-center text-6xl font-semibold leading-none">{category.title}</h1>
      <ul className="mb-11 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
        {categoryPodcasts.map((podcast) => (
          <li className="list-item text-xl" key={podcast.title}>
            <Link
              className="relative cursor-pointer rounded bg-neutral-100"
              to={{
                pathname: '/podcast',
                search: `?rss=${encodeURIComponent(podcast.url)}`,
              }}
            >
              <div className="relative rounded">
                <img className="h-auto w-full" src={podcast.image} alt={podcast.title} />
              </div>
            </Link>
            <h2 className="my-3.5 break-words font-semibold">{podcast.title}</h2>
          </li>
        ))}
      </ul>
    </>
  );
}
