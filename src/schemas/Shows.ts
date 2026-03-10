export type TVShow = {
  id: string;
  name: string;
  genres: string[];
  rating: {
    average: number;
  };
  description: string;
  url: string;
  type: string;
  language: string;
  premiered: string;
  image: {
    medium: string;
    original: string;
  };
};
