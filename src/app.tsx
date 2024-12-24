import { createBrowserRouter, Outlet, RouterProvider, useRouteError } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '@/components/header';
import Player from '@/components/player/player';
import Home from '@/pages/home';
import Podcast from '@/pages/podcast';
import Category from '@/pages/category';
import { AppProvider } from '@/store/app-state';

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  // Uncaught Reference Error: path is not defined
  return <div>Something went wrong!</div>;
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/podcast',
          errorElement: <ErrorBoundary />,
          element: <Podcast />,
        },
        {
          path: '/category/:categoryId',
          element: <Category />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

const queryClient = new QueryClient();

function Root() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="mx-auto max-w-[62rem] px-4 pb-8 pt-24">
          <Outlet />
        </div>
        <Player />
      </QueryClientProvider>
    </AppProvider>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
