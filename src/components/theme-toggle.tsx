import { useDarkMode } from 'usehooks-ts';

import MoonIcon from '@/components/icons/moon';
import SunIcon from '@/components/icons/sun';

function updateDom(isDark: boolean) {
  const color = isDark ? '#212c31' : 'fff';
  document.getElementById('theme')?.setAttribute('content', color);
  document.documentElement.classList.toggle('dark', isDark);
}

function switchTheme(isDark: boolean) {
  document.documentElement.classList.add('is-transitioning');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      updateDom(isDark);
      setTimeout(function () {
        document.documentElement.classList.remove('is-transitioning');
      }, 340);
    });
  });
}

export default function ThemeToggle() {
  const { isDarkMode, toggle } = useDarkMode();

  function toggleTheme() {
    toggle();
    switchTheme(!isDarkMode);
  }

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-label="Toggle Theme"
      className="rounded-md p-2 text-foreground/60 hover:text-indigo-600 focus:border focus:border-gray-400"
    >
      {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}
