import { create } from 'zustand';
import { PodcastMeta, PodcastEpisode, PlayerStatus } from '@/types';

type PlayerState = {
  podcast: PodcastMeta | null;
  episode: PodcastEpisode | null;
  status: PlayerStatus;
  duration: number;
  volume: number;
  currentTime: number;
  currentIndex: number;
  totalEpisode: number;
};

type PlayerActions = {
  setActiveEpisode: (podcast: PodcastMeta, song: PodcastEpisode) => void;
  nextEpisode: () => void;
  prevEpisode: () => void;
  setPlayerStatus: (i: PlayerStatus) => void;
  setDuration: (value: number) => void;
  setVolume: (value: number) => void;
  updateCurrentTime: (offset: number) => void;
  setCurrentTime: (value: number) => void;
};

const initialState: PlayerState = {
  podcast: null,
  episode: null,
  status: 'disabled',
  duration: 0,
  volume: 1,
  currentTime: 0,
  currentIndex: 0,
  totalEpisode: 0,
};

const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  ...initialState,

  setActiveEpisode: (podcast: PodcastMeta, episode: PodcastEpisode) => {
    set(() => ({
      podcast,
      episode: episode,
      currentIndex: podcast.items.findIndex((item) => item.id === episode.id),
      totalEpisode: podcast.items.length,
      status: 'play',
      currentTime: 0,
    }));
  },

  nextEpisode: () => {
    set((state) => ({
      ...state,
      episode: state.podcast?.items[state.currentIndex - 1],
      currentIndex: state.currentIndex - 1,
      status: 'play',
      currentTime: 0,
    }));
  },

  prevEpisode: () => {
    set((state) => ({
      ...state,
      episode: state.podcast?.items[state.currentIndex + 1],
      currentIndex: state.currentIndex + 1,
      status: 'play',
      currentTime: 0,
    }));
  },

  setPlayerStatus: (status: PlayerStatus) => {
    set(() => ({
      status: status,
    }));
  },

  setDuration: (duration: number) => {
    set(() => ({
      duration,
    }));
  },

  setVolume: (volume: number) => {
    set(() => ({
      volume,
    }));
  },

  setCurrentTime: (currentTime: number) => {
    set(() => ({
      currentTime,
    }));
  },

  updateCurrentTime: (offset: number) => {
    set((state) => ({
      ...state,
      currentTime: state.currentTime + offset,
    }));
  },
}));

export default usePlayerStore;
