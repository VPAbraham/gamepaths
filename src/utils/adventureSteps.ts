import { PLATFORMS, GENRES } from './constants';
import type { AdventureStep } from '../types/adventure.types';

export const adventureSteps: AdventureStep[] = [
  {
    id: 'platform',
    question: 'What is your preferred gaming platform?',
    options: [
      {
        id: 'pc',
        label: 'PC Gaming',
        icon: '🖥️',
        filters: { platforms: PLATFORMS.PC },
      },
      {
        id: 'console',
        label: 'Console Gaming',
        icon: '🎮',
        filters: {
          platforms: [PLATFORMS.PS5, PLATFORMS.XBOX_SERIES, PLATFORMS.SWITCH],
        },
      },
      {
        id: 'retro',
        label: 'Retro Gaming',
        icon: '👾',
        filters: { platforms: [PLATFORMS.PS3, PLATFORMS.XBOX_360] },
      },
    ],
  },
  {
    id: 'playstyle',
    question: 'How do you like to play?',
    options: [
      {
        id: 'solo',
        label: 'Solo Adventures',
        icon: '🎯',
        filters: { tags: 'singleplayer' },
      },
      {
        id: 'coop',
        label: 'Co-op Fun',
        icon: '👥',
        filters: { tags: 'co-op' },
      },
      {
        id: 'competitive',
        label: 'Competitive Multiplayer',
        icon: '⚔️',
        filters: { tags: 'multiplayer' },
      },
    ],
  },
  {
    id: 'genre',
    question: 'What kind of experience are you looking for?',
    options: [
      {
        id: 'action',
        label: 'Action Packed',
        icon: '💥',
        filters: { genres: GENRES.ACTION },
      },
      {
        id: 'story',
        label: 'Story Rich',
        icon: '📚',
        filters: { genres: [GENRES.RPG, GENRES.ADVENTURE] },
      },
      {
        id: 'strategy',
        label: 'Mind Games',
        icon: '🧩',
        filters: { genres: [GENRES.STRATEGY, GENRES.PUZZLE] },
      },
    ],
  },
];
