/**
 * Returns a new shuffled copy of the array (Fisher-Yates).
 * Does NOT mutate the original array.
 */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Returns a single random item from the array.
 */
export function pickOne<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("pickOne: cannot pick from an empty array");
  }
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Returns `count` random, non-repeating items from the array.
 */
export function pickMany<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count);
}
