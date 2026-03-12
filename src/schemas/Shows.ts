/**
 * TV Show image data structure.
 */
export type TVShowImage = {
  medium?: string;
  original?: string;
};

/**
 * TV Show rating data structure.
 */
export type TVShowRating = {
  average?: number;
};
/**
 * TV Show data structure to be used in the TV Show Dashboard.
 */
export type TVShow = {
  id: string;
  name: string;
  genres: string[];
  rating: TVShowRating;
  url: string;
  type: string;
  language: string;
  premiered: string;
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
  schedule: { time: string; days: string[] };
  summary: string;
};
