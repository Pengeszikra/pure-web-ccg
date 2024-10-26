// @ts-check

import { cardCollection, setup } from "./alien.js"
import { signal, monitor, delay, fragment, STATIC } from './old-bird-soft.js';

/** @typedef {import('./alien.js').State & {render?:object}} State */
import { DIRECT } from './old-bird-soft';

/**
 * @type {(
 *   parent:string,
 *   id:string,
 *   name:string,
 *   topRem:number,
 *   leftRem:number
 * ) => {
 *  slot:HTMLElement,
 *  moveCardTo:(card:HTMLElement) => void,
 *  teleportCardTo:(card:HTMLElement) => void,
 *  topRem: number,
 *  leftRem: number,
 * }}
 */
const slot = (parent, id, name, topRem, leftRem) => {
  const slot = fragment('#slot', parent, id);
  slot.querySelector('#name').innerText = name;
  const moveCardTo = async (card) => {
    card.parentElement.appendChild(card)
    await delay(7);
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  const teleportCardTo = (card) => {
    card.parentElement.appendChild(card)
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  slot.onclick = async () => {
    alien._over_ = id;
    alien.table[id] = alien.deck.shift();
  }
  slot.onmouseover = async () => {
    try {
      // console.log(id);
      const mm = moveMap(alien.table[id]);
      // console.log(mm);
      alien._over_ = mm;
      // TODO rework :: tableOfSlots are the wierd connection between a reactive state and dom element
      mm.map(([,,target]) => tableOfSlots[target.id].slot.dataset.possible = 1);
    } catch (error) {
      alien._over_ = error
    }
  }

  slot.onmouseleave = async () => {
    try {
      Object.values(tableOfSlots).map(({slot}) => slot.removeAttribute('data-possible'));
    } catch (error) {
      console.warn(error)
    }
  }
  return { slot, moveCardTo, topRem, leftRem, teleportCardTo };
};

fragment('#empty', '#table');
const DK = slot('#table', 'DK', 'Deck', 1, 15);
const DR = slot('#table', 'DR', 'Drop', 1, 15 + 13.5);

const L1 = slot('#incoming', 'L1', 'Line 1', 19.5, 1);
const L2 = slot('#incoming', 'L2', 'Line 2', 19.5, 15);
const L3 = slot('#incoming', 'L3', 'Line 3', 19.5, 15 + 13.5);
const L4 = slot('#incoming', 'L4', 'Line 4', 19.5, 15 + 27);

const HE = slot('#player', 'HE', 'Hero', 19 + 19, 1);
const A1 = slot('#player', 'A1', 'Action 1', 19 + 19, 15);
const A2 = slot('#player', 'A2', 'Action 2', 19 + 19, 15 + 13.5);
const S1 = slot('#player', 'S1', 'Store 1', 19 + 19, 15 + 27);

const tableOfSlots = {
  DK,DR,
  L1,L2,L3,L4,
  HE,A1,A2,S1,
};

const pick = arr => arr[Math.random() * arr.length | 0];

const cardMiddleware = async (obj, prop, value) => {
  //  console.log(obj, prop, value)
  if (prop === 'mov') {
    /** @type {{card:HTMLElement}} */
    const {card}= obj;
    // await delay(7)
    card.parentElement.appendChild(card);
    await delay(7)
    value.moveCardTo(obj.card);
    
    return {...obj, [prop]: [value.slot.id, value.topRem, value.leftRem]};
  }
  return value;
}

const spriteSheet =
  [4, 26, 50, 74, 96].map((horizontal) =>
    [4, 36, 69, 103].map((vertical) => `${horizontal}% ${vertical}%`)
).flat();

alien.render = {[STATIC]:true};

const cardList = [...alien.deck].reverse()
  .map((source, index) => {
    const [power, maxPower, id] = source.split('|');
    const card = fragment('#card', "#desk", id)
    alien.render[card.id] = signal(cardMiddleware)({card})
    alien.render[card.id].mov = tableOfSlots.DK
    tableOfSlots.DK.teleportCardTo(card);
    card.style.backgroundPosition = spriteSheet[index % spriteSheet.length]  // pick(spriteSheet);
    card.querySelector('#name').innerHTML = id;
    card.querySelector('#power').innerHTML = power;
    return card;
  });

globalThis.signal = signal; // TODO remove
globalThis.cardCollection = cardCollection; // TODO remove
globalThis.monitor = monitor; // TODO remove
globalThis.ts = tableOfSlots; // TODO remove
globalThis.render = alien.render; // TODO remove

setTimeout(() => {
  goingForward()
}, 500);