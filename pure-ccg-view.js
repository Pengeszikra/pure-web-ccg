// @ts-check

import { cardCollection, setup } from "./alien.js"
import { signal, monitor, delay, fragment, STATIC } from './old-bird-soft.js';

/** @typedef {import('./alien.js').State & {count:number, draw:object | null}} State */

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
 *  topRem: number,
 *  leftRem: number,
 * }}
 */
const slot = (parent, id, name, topRem, leftRem) => {
  const slot = fragment('#slot', parent, id);
  slot.querySelector('#name').innerText = name;
  const moveCardTo = async (card) => {
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  slot.onclick = async () => {
    // const draw = pick(cardList.filter(({ style }) =>
    //   slot.style.top + ':' + slot.style.left
    //   !==
    //   style.top + ':' + style.left
    // ));
    // if (!draw) return;
    // state.draw = draw.id;
    // document.querySelector('#desk')?.appendChild(draw);
    // draw.style.zIndex = (state.count += 10).toString();
    // await delay(100);
    // view.deck[draw.id].mov = view.slotList[id]
  }
  slot.onmouseover = async () => {
    try {
      // console.log(id);
      const mm = moveMap(alien.table[id]);
      // console.log(mm);
      alien._over_ = mm;
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
  return { slot, moveCardTo, topRem, leftRem };
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

const cardMiddleware = (obj, prop, value) => {
  // console.log(obj, prop, value)
  if (prop === 'mov') {
    obj.card.style.zIndex = (alien.count += 10).toString();
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
alien.count = 0;
const cardList = [...alien.deck].reverse()
  .map((source, index) => {
    const [power, maxPower, id] = source.split('|');
    const card = fragment('#card', "#desk", id)
    alien.render[card.id] = signal(cardMiddleware)({card})
    alien.render[card.id].mov = tableOfSlots.DK
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