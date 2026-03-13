import { Genre } from '@/schemas/genres';

export interface GenreConfig {
  id: Genre;
  label: string;
  icon: string;
  color: string;
}

export const GENRES: Record<Genre, GenreConfig> = {
  [Genre.ALL]: {
    id: Genre.ALL,
    label: 'All',
    icon: 'pi pi-globe',
    color: '#ef4444',
  },

  [Genre.ACTION]: {
    id: Genre.ACTION,
    label: 'Action',
    icon: 'pi pi-bolt',
    color: '#ef4444',
  },

  [Genre.ADVENTURE]: {
    id: Genre.ADVENTURE,
    label: 'Adventure',
    icon: 'pi pi-compass',
    color: '#f97316',
  },

  [Genre.COMEDY]: {
    id: Genre.COMEDY,
    label: 'Comedy',
    icon: 'pi pi-face-smile',
    color: '#facc15',
  },

  [Genre.DRAMA]: {
    id: Genre.DRAMA,
    label: 'Drama',
    icon: 'pi pi-users',
    color: '#6366f1',
  },

  [Genre.HORROR]: {
    id: Genre.HORROR,
    label: 'Horror',
    icon: 'pi pi-exclamation-triangle',
    color: '#9333ea',
  },

  [Genre.THRILLER]: {
    id: Genre.THRILLER,
    label: 'Thriller',
    icon: 'pi pi-eye',
    color: '#dc2626',
  },

  [Genre.SCI_FI]: {
    id: Genre.SCI_FI,
    label: 'Sci-Fi',
    icon: 'pi pi-globe',
    color: '#3b82f6',
  },

  [Genre.FANTASY]: {
    id: Genre.FANTASY,
    label: 'Fantasy',
    icon: 'pi pi-star',
    color: '#8b5cf6',
  },

  [Genre.MYSTERY]: {
    id: Genre.MYSTERY,
    label: 'Mystery',
    icon: 'pi pi-search',
    color: '#0ea5e9',
  },

  [Genre.CRIME]: {
    id: Genre.CRIME,
    label: 'Crime',
    icon: 'pi pi-shield',
    color: '#b91c1c',
  },

  [Genre.ROMANCE]: {
    id: Genre.ROMANCE,
    label: 'Romance',
    icon: 'pi pi-heart',
    color: '#ec4899',
  },

  [Genre.FAMILY]: {
    id: Genre.FAMILY,
    label: 'Family',
    icon: 'pi pi-home',
    color: '#22c55e',
  },

  [Genre.ANIMATION]: {
    id: Genre.ANIMATION,
    label: 'Animation',
    icon: 'pi pi-palette',
    color: '#f59e0b',
  },

  [Genre.DOCUMENTARY]: {
    id: Genre.DOCUMENTARY,
    label: 'Documentary',
    icon: 'pi pi-video',
    color: '#14b8a6',
  },

  [Genre.HISTORY]: {
    id: Genre.HISTORY,
    label: 'History',
    icon: 'pi pi-book',
    color: '#78716c',
  },

  [Genre.WAR]: {
    id: Genre.WAR,
    label: 'War',
    icon: 'pi pi-flag',
    color: '#7f1d1d',
  },

  [Genre.WESTERN]: {
    id: Genre.WESTERN,
    label: 'Western',
    icon: 'pi pi-map',
    color: '#92400e',
  },

  [Genre.MUSIC]: {
    id: Genre.MUSIC,
    label: 'Music',
    icon: 'pi pi-volume-up',
    color: '#06b6d4',
  },

  [Genre.SPORTS]: {
    id: Genre.SPORTS,
    label: 'Sports',
    icon: 'pi pi-trophy',
    color: '#16a34a',
  },

  [Genre.BIOGRAPHY]: {
    id: Genre.BIOGRAPHY,
    label: 'Biography',
    icon: 'pi pi-book',
    color: '#475569',
  },

  [Genre.ADULT]: {
    id: Genre.ADULT,
    label: 'Adult',
    icon: 'pi pi-lock',
    color: '#000000',
  },

  [Genre.ANIME]: {
    id: Genre.ANIME,
    label: 'Anime',
    icon: 'pi pi-star',
    color: '#ff4500',
  },

  [Genre.CHILDREN]: {
    id: Genre.CHILDREN,
    label: 'Children',
    icon: 'pi pi-users',
    color: '#ff69b4',
  },

  [Genre.DIY]: {
    id: Genre.DIY,
    label: 'Do It Yourself',
    icon: 'pi pi-wrench',
    color: '#008000',
  },

  [Genre.ESPIONAGE]: {
    id: Genre.ESPIONAGE,
    label: 'Espionage',
    icon: 'pi pi-eye',
    color: '#800080',
  },

  [Genre.FOOD]: {
    id: Genre.FOOD,
    label: 'Food',
    icon: 'pi pi-apple',
    color: '#ff6347',
  },

  [Genre.LEGAL]: {
    id: Genre.LEGAL,
    label: 'Legal',
    icon: 'pi pi-gavel',
    color: '#2f4f4f',
  },

  [Genre.MEDICAL]: {
    id: Genre.MEDICAL,
    label: 'Medical',
    icon: 'pi pi-heart',
    color: '#ff0000',
  },

  [Genre.NATURE]: {
    id: Genre.NATURE,
    label: 'Nature',
    icon: 'pi pi-globe',
    color: '#228b22',
  },

  [Genre.SUPERNATURAL]: {
    id: Genre.SUPERNATURAL,
    label: 'Supernatural',
    icon: 'pi pi-sparkles',
    color: '#ff4500',
  },

  [Genre.TRAVEL]: {
    id: Genre.TRAVEL,
    label: 'Travel',
    icon: 'pi pi-map',
    color: '',
  },

  [Genre.UNKNOWN]: {
    id: Genre.UNKNOWN,
    label: 'Unknown',
    icon: 'pi pi-question-circle',
    color: '#00000',
  },
};

export const genreList = Object.values(GENRES);

export const getGenreConfig = (genre: Genre) => {
  return GENRES[genre];
};
