import { delay } from "./pure-alien-solitare"
import { setup , cardCollection } from './alien';
import { zignal } from './old-bird-soft';

export const saga = async (ms = 200) => {
  const ss = zignal(monitor)(structuredClone(setup))
  await delay(ms)
  Object.keys(ss.table).map(key => ss.table[key] = null)
  await delay(ms)
  ss.deck = cardCollection.slice(0,11).map(({name,power,type,side}) => [name,power,type,side].join('|') )
  await delay(ms)
  ss.table.HERO = ss.deck.shift()
  await delay(ms)
  const bum = setInterval(() => ss.deck.sort(() => Math.random() > .5 ? -1 : 1),ms)
  await delay(ms * 5)
  clearInterval(bum)
  await delay(ms)
  const fillUp = () => ["L1", "L2", "L3", "L4"]
    .filter(slot => !ss.table[slot])
    .map(slot => ss.table[slot] = ss.deck.shift())
  await delay(ms)
  fillUp()
  await delay(ms)
  let enemy = ss.table.L2
  await delay(ms)
  ss.fly = enemy;
  await delay(ms)
  ss.fly = ss.fly.split('|')
  await delay(ms)
  ss.table.L2 = null;
  await delay(ms)
  ss.table.HERO = ss.table.HERO.split('|')
  await delay(ms)
  ss.table.HERO[1] = + ss.table.HERO[1]
  await delay(ms)
  ss.table.HERO[1] -= +ss.fly[1]
  await delay(ms)
  ss.table.HERO = ss.table.HERO.join('|')
  await delay(ms)
  ss.lost.push(enemy)
  await delay(ms)
  ss.lost.push(ss.table.HERO)
  await delay(ms)
  ss.table.HERO = null
  await delay(ms)
  ss.phases = "THE END"
}