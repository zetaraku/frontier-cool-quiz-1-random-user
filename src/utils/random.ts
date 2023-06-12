export function shuffled<T>(items: T[], maxCount = items.length): T[] {
  const itemsCopy = items.slice();

  for (let i = 0; i < itemsCopy.length; i += 1) {
    if (i + 1 > maxCount) break;

    const j = i + Math.floor((itemsCopy.length - i) * Math.random());
    [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]];
  }

  return itemsCopy;
}

export function pickItem<T>(items: T[]): T {
  return items[Math.floor(items.length * Math.random())];
}

export function pickItems<T>(items: T[], count: number): T[] {
  return [...Array(count)].map(() => pickItem(items));
}

export function pickUniqueItems<T>(items: T[], maxCount: number): T[] {
  return shuffled(items, maxCount).slice(0, maxCount);
}
