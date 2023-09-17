export interface Podcast {
  title: string;
  category: string;
  url: string;
  description?: string;
  originalImage?: string;
  link?: string;
  date?: string;
  subtitle?: string;
  image?: string;
}

export interface Category {
  title: string;
  slug: string;
}

export interface CategoryDetail {
  title: string;
  slug: string;
  podcasts: Podcast[];
}

export interface PodcastMeta {
  title: string;
  description: string;
  link: string;
  image: string;
  category: any[];
  items: PodcastEpisode[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  link: string;
  published: number;
  created: number;
  category: any[];
  content?: string;
  enclosures: Enclosure[];
  content_encoded?: string;
  itunes_summary: string;
  itunes_author: string;
  itunes_explicit: string;
  itunes_duration: string;
  itunes_episode: number;
  itunes_episodeType: string;
  media: any;
  itunes_image?: any;
}

export interface Enclosure {
  length: string;
  type: string;
  url: string;
}

export type PlayerStatus = 'disabled' | 'play' | 'pause' | 'load';
