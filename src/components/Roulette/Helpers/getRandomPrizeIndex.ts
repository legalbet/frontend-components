import { WHEEL_PARAMS } from '../constants';

/**
 * Get a random index for a prize in the extended wheel array.
 * @param baseCount The number of unique prizes (length of base array).
 * @param totalCount The total length of the extended array.
 * @param randomFn The function to generate a random number in the range [0,1). Defaults to Math.random.
 * @returns The random index.
 */
export function getRandomPrizeIndex(
  baseCount: number,
  totalCount: number,
  randomFn: () => number = Math.random
): number {
  const offset = baseCount * WHEEL_PARAMS.minRoundsOffset;
  const range = totalCount - baseCount - offset;
  if (range <= 0) return offset; // fallback
  return Math.floor(randomFn() * range + offset);
}
