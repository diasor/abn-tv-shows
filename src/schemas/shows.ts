import { Genre } from '@/schemas/genres';
import { type TVShowImage } from '@/schemas/images';
import { type TVShowRating } from '@/schemas/rating';

/**
 * TV Show schedule data structure.
 */
export type TVShowSchedule = {
  time: string;
  days: string[];
};
/**
 * TV Show data structure to be used in the TV Show Dashboard.
 */
export type TVShow = {
  id: string;
  name: string;
  genres?: Genre[];
  rating: TVShowRating;
  url: string;
  type: string;
  language?: string;
  premiered?: string | null;
  image: TVShowImage;
};

/**
 * TV Show Details data structure to be used in
 * the TV Show Details page.
 */
export type TVShowDetails = TVShow & {
  status: string;
  runtime: number;
  ended: string | null;
  officialSite: string | null;
  schedule: TVShowSchedule;
  summary: string;
};
