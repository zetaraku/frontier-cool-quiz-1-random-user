import sleep from 'sleep-promise';
import type { User } from '@/types';

export async function getTestUsers(count: number = 3010, seed: string = 'abc', delayMs: number = 0) {
  await sleep(delayMs);

  const url = new URL('https://randomuser.me/api/'); {
    url.searchParams.set('results', String(count));
    url.searchParams.set('seed', seed);
  }

  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  const users = data.results as User[];

  return users;
}
