import usePlayerStore from '@/store/player-store';
import { useEffect } from 'react';

type AudioElementProps = {
  audioElement: React.RefObject<HTMLAudioElement | null>;
};

export function useAudioElement({ audioElement }: AudioElementProps) {
  const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const status = usePlayerStore((state) => state.status);
  const episode = usePlayerStore((state) => state.episode);
  const volume = usePlayerStore((state) => state.volume);

  useEffect(() => {
    if (!audioElement.current) {
      return;
    }

    function updateCurrentTime() {
      const value = audioElement.current?.currentTime || 0;
      setCurrentTime(value);
    }

    function timeUpdate() {
      setTimeout(updateCurrentTime, 0);
    }

    function loadMetaData() {
      const value = audioElement.current?.duration || 0;
      setDuration(value);
      updateCurrentTime();
    }

    audioElement.current.addEventListener('loadedmetadata', loadMetaData);
    audioElement.current.addEventListener('pause', () => setPlayerStatus('pause'));
    audioElement.current.addEventListener('play', () => setPlayerStatus('play'));
    audioElement.current.addEventListener('playing', () => setPlayerStatus('play'));
    audioElement.current.addEventListener('seek', updateCurrentTime);
    audioElement.current.addEventListener('seeking', updateCurrentTime);
    audioElement.current.addEventListener('timeupdate', timeUpdate);
  }, [audioElement, setCurrentTime, setDuration, setPlayerStatus]);

  useEffect(() => {
    if (status === 'disabled') {
      return;
    }

    if (status === 'play') {
      audioElement?.current?.play().catch(() => console.log('playing failed or was interrupted'));
    }

    if (status === 'pause') {
      audioElement?.current?.pause();
    }
  }, [status, episode, audioElement]);

  useEffect(() => {
    if (audioElement?.current) {
      audioElement.current.volume = volume;
    }
  }, [audioElement, volume]);
}
