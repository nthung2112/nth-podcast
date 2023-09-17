import usePlayerStore from '@/store/player-store';
import PlayerBar from './player-bar';

export default function Player() {
  const episode = usePlayerStore((state) => state.episode);
  const podcast = usePlayerStore((state) => state.podcast);

  if (!episode || !podcast) {
    return null;
  }

  return <PlayerBar episode={episode} podcast={podcast} />;
}
