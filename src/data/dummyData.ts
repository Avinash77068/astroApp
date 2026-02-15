import { CategoryItem, HomeItem } from '../types/api.types';

export const categories: CategoryItem[] = [
  { id: '1', name: 'Astrology', icon: '⭐' },
  { id: '2', name: 'Tarot', icon: '🔮' },
  { id: '3', name: 'Numerology', icon: '🔢' },
  { id: '4', name: 'Palmistry', icon: '✋' },
  { id: '5', name: 'Vastu', icon: '🏠' },
  { id: '6', name: 'Horoscope', icon: '📅' },
];

export const homeItems: HomeItem[] = [
  {
    id: '1',
    title: 'Daily Horoscope',
    description: 'Get your personalized daily predictions',
    image: '🌟',
    category: 'Astrology',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Tarot Reading',
    description: 'Discover what cards reveal about your future',
    image: '🎴',
    category: 'Tarot',
    rating: 4.9,
  },
  {
    id: '3',
    title: 'Birth Chart Analysis',
    description: 'Complete analysis of your birth chart',
    image: '📊',
    category: 'Astrology',
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Numerology Report',
    description: 'Unlock the secrets hidden in numbers',
    image: '🔢',
    category: 'Numerology',
    rating: 4.6,
  },
  {
    id: '5',
    title: 'Palm Reading',
    description: 'Read the lines of your destiny',
    image: '✋',
    category: 'Palmistry',
    rating: 4.5,
  },
  {
    id: '6',
    title: 'Vastu Consultation',
    description: 'Harmonize your living space',
    image: '🏡',
    category: 'Vastu',
    rating: 4.8,
  },
  {
    id: '7',
    title: 'Love Compatibility',
    description: 'Check compatibility with your partner',
    image: '💕',
    category: 'Astrology',
    rating: 4.9,
  },
  {
    id: '8',
    title: 'Career Guidance',
    description: 'Find the right career path',
    image: '💼',
    category: 'Astrology',
    rating: 4.7,
  },
];
