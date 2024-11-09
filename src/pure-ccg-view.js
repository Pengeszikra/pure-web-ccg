// @ts-check

import { cardCollection } from "./alien.js"
import { signal, monitor, delay, fragment, STATIC, monitorView } from './old-bird-soft.js';

import "./alien-solitare-gameplay.js"; // easy to solve multi script problem

/** @typedef {import('./alien.js').State} State */

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
  /** @type {HTMLElement} */
  const element = slot.querySelector('#name')
  if(element?.innerText) {element.innerText  = name; }
  /** @type {(card:HTMLElement) => Promise} */
  const moveCardTo = async (card) => {
    card.parentElement.appendChild(card)
    await delay(7);
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  /** @type {(card:HTMLElement) => void} */
  const teleportCardTo = (card) => {
    card.parentElement.appendChild(card)
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  slot.onclick = async () => {
    // alien.table[id] = {id, card:alien.deck.shift()};
    if (alien.fly?.id) {
      const found = alien.fly.moves
        // .map(([f, from, to]) => [from.id, to.id, id, alien.fly.id, from.id == alien.fly.id && to.id == id])
        .find(([, from, to]) => from.id == alien.fly.id && to.id == id)
        // .map(console.log)
      console.log(found);
      if (found) {
        const {card} = alien.table[alien.fly.id];
        alien.table[alien.fly.id].card = null;
        alien.table[id] = {id, card};
        //console.log({id, card: alien.table[alien.fly.id].card})
      }
      alien.fly = null;
      alien._over_ = [];
    }
    if (alien._over_?.[0]?.[1]?.id) {
      alien.fly = {id, moves: alien._over_};
      console.log(alien.fly.id, alien.fly.moves[0][1].card)
    }
  }
  slot.onmouseover = async () => {
    try {
      // console.log(id);
      const mm = moveMap(alien.table[id]);
      // console.log(mm);
      alien._over_ = mm;
      // TODO rework :: tableOfSlots are the wierd connection between a reactive state and dom element
      // @ts-ignore
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

/** @type {<T extends Array>(arr:T) => T} */
export const pick = arr => arr[Math.random() * arr.length | 0];

/** --type {import("./old-bird-soft.js").Watcher} */
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
    const [power,,id,,,work] = source.split('|');
    const card = fragment('#card', "#desk", id)
    alien.render[card.id] = signal(cardMiddleware)({card})
    alien.render[card.id].mov = tableOfSlots.DK
    tableOfSlots.DK.teleportCardTo(card);
    card.style.backgroundPosition = spriteSheet[index % spriteSheet.length]  // pick(spriteSheet);
    card.querySelector('#name').innerHTML = id;
    card.querySelector('#power').innerHTML = power;
    card.querySelector('#work').innerHTML = work;
    return card;
  });


globalThis.cardList = cardList;
globalThis.signal = signal; // TODO remove
globalThis.cardCollection = cardCollection; // TODO remove
globalThis.monitor = monitor; // TODO remove
globalThis.ts = tableOfSlots; // TODO remove
globalThis.render = alien.render; // TODO remove

setTimeout(() => goingForward(), 500);

const debugSwitch = document.querySelector('code');
debugSwitch.onclick = () => monitorView.style.visibility 
  = monitorView.style.visibility === 'hidden' 
  ? 'visible' 
  : 'hidden';
monitorView.style.visibility = 'hidden';

class TeaserAnimation extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <article class="
        hidden
        absolute
        top-12
        right-12
        p-16
        bg-zinc-800
        transition-all duration-500
        hover:-translate-x-96
      ">
        <h1 class="text-orange-500 text-2xl">
          Some information
        </h1>
        Some really inefficent Teaser article
        <p>Maybe some trick we can using</p>
        <br>
        Lets right solution of design system
        <br>
        sometimes it is too complicated
      </article>
    `
  }
}

customElements.define('teaser-animation', TeaserAnimation);

// https://kinsta.com/blog/web-components/