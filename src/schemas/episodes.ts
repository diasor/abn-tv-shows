import { TVShowImage } from '@/schemas/images';
import { TVShowRating } from '@/schemas/ratings';

export type TVShowEpisode = {
  id: string;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: TVShowRating;
  image: TVShowImage;
  summary: string;
  _links: {
    self: {
      href: string;
    };
    show: {
      href: string;
      name: string;
    };
  };
};

export type TVShowEpisodes = TVShowEpisode[];
