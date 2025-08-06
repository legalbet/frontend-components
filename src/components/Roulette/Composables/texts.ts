import { provide, inject } from 'vue';
import type { Texts } from '../types';

export const ROULETTE_TEXTS_SYMBOL = Symbol('RouletteTexts');

export const defaultRouletteTexts: Texts = {
  titleStart: 'Try your luck!',
  subtitleStart: 'Spin the wheel and get your bonus',
  availableSpinsPrefix: 'Available spins ×',
  noSpins: 'You have no available spins. Try again tomorrow',
  confirmAgeLabel: 'I confirm that I am over 18 years old',
  spinButton: 'Spin to win',
  twistTitle: 'Twist, twist...',
  resultTitle: "Congratulations! It's your lucky day",
  spinAgainButton: 'Spin again',
  getBonusButton: 'Get bonus',
  showTerms: 'Show T&C',
  hideTerms: 'Hide T&C',
  termMark: '18+ | Responsible gambling',
  termsContent:
    'Register, verify your account, and make a first deposit of ₦1000 or more to receive a 300% boost up to ₦180 000.\nMeet the 10x wagering requirement by placing multi bets with 3 or more selections, each with odds at least 1.50.\nThe reward is valid for 7 days.',
};

export function provideRouletteTexts(texts: Partial<Texts> = {}) {
  provide(ROULETTE_TEXTS_SYMBOL, { ...defaultRouletteTexts, ...texts });
}

export function useText<Key extends keyof Texts>(key: Key): Texts[Key] {
  const texts = inject<Texts>(ROULETTE_TEXTS_SYMBOL, defaultRouletteTexts);
  return texts[key];
}
