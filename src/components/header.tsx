import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppContext } from '@/store/app-state';

import Logo from './logo';
import ThemeToggle from './theme-toggle';

export default function Header() {
  const { categories } = useAppContext();
  const [state, setState] = useState(false);

  return (
    <nav className="bg-background/98 fixed inset-x-0 top-0 z-50 w-full border-border/40 bg-background/95 text-gray-800 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:border-0">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block">
          <NavLink to="/">
            <Logo className="block h-full w-auto" width={120} height={50} />
          </NavLink>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${state ? 'block' : 'hidden'}`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {categories.map((category, idx) => {
              return (
                <li key={idx} className="text-foreground/60 hover:text-indigo-600">
                  <NavLink to={`/category/${category.slug}`}>{category.title}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden md:inline-block">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
