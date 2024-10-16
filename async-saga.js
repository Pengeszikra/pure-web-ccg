import { setup , cardCollection } from './alien.js';
import { zignal, delay } from './old-bird-soft.js';

export const gameFlow = async (ms = 200) => {
  const game = zignal(monitor)(structuredClone(setup))
  globalThis.ss = game;
    await delay(ms)
  Object.keys(game.table).map(key => game.table[key] = null)
    await delay(ms)
  game.deck = cardCollection.slice(0,11).map(({name,power,type,side}) => [name,power,type,side].join('|') )
    await delay(ms)
  game.table.HERO = game.deck.shift()
    await delay(ms)
  const bum = setInterval(() => game.deck.sort(() => Math.random() > .5 ? -1 : 1),ms)
  await delay(ms * 5)
  clearInterval(bum)
    await delay(ms)
  const fillUp = () => ["L1", "L2", "L3", "L4"]
    .filter(slot => !game.table[slot])
    .map(slot => game.table[slot] = game.deck.shift())
    await delay(ms)
  fillUp()
    await delay(ms)
  let enemy = game.table.L2
    await delay(ms)
  game.fly = enemy;
    await delay(ms)
  game.fly = game.fly.split('|')
    await delay(ms)
  game.table.L2 = null;
    await delay(ms)
  game.table.HERO = game.table.HERO.split('|')
    await delay(ms)
  game.table.HERO[1] = + game.table.HERO[1]
    await delay(ms)
  game.table.HERO[1] -= +game.fly[1]
    await delay(ms)
  game.table.HERO = game.table.HERO.join('|')
    await delay(ms)
  game.lost.push(enemy)
    await delay(ms)
  game.lost.push(game.table.HERO)
    await delay(ms)
  game.table.HERO = null
    await delay(ms)
  game.phases = "THE END"
}

