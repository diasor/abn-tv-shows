export const tvShowImage = {
  medium: 'https://example.com/image.jpg',
  original: 'https://example.com/imageOriginal.jpg',
};

export const tvShow1 = {
  id: '1',
  name: 'Test Show 1',
  language: 'English',
  genres: ['Drama'],
  premiered: '2020-01-01',
  rating: { average: 8.0 },
  image: tvShowImage,
  url: '',
  type: '',
};

export const tvShow2 = {
  id: '2',
  name: 'Test Show 2',
  language: 'Dutch',
  genres: ['Comedy'],
  premiered: '2016-12-01',
  rating: { average: 9.0 },
  image: { medium: 'https://example.com/image.jpg' },
};

export const tvShowComplete = {
  id: '1',
  name: 'Test Show',
  language: 'English',
  genres: ['Drama', 'Action'],
  premiered: '2020-01-15',
  rating: { average: 8.5 },
  url: '',
  type: '',
  ended: '2020-01-01',
  image: tvShowImage,
  status: 'Ended',
  runtime: 60,
  officialSite: '',
  schedule: {
    time: '20',
    days: ['Monday'],
  },
  summary: 'show summary',
};
