// A single step to move this code out from file
// which means easy to modularize javascript 
// even without building.
// this is help to using jsDoc in code a proper way.

import { cardCollection } from "./alien.js"

const spriteSheet = 
  [4, 26, 50, 74, 96]
    .map((horizontal) =>
    [4, 36, 69, 103]
      .map((vertical) => `${horizontal}% ${vertical}%`)
).flat();

const monitorView = document.getElementById('monitor')
const monitor = state => {
  if (!monitorView) return;
  try {
    monitorView.innerText = JSON.stringify(state, null, 2);
  } catch (error) {
    console.error(console.error());
    monitorView.innerText = error;
  }
};

/**
 * Reactive State aka Signal
 * 
 * @type {<T>(state:T) => T} 
 */
const signal = (state) => Proxy.revocable(
  { count: 0 }, 
  {
    get: (obj, prop) => obj[prop],
    set: (obj, prop, value) => {
      obj[prop] = value;
      monitor(obj);
      return true;
    }
  })
.proxy;

const state = signal(/** @type {{count:number}} */{ count: 0 });

/** @type {(templateId:string, parent:string, id?:string) => HTMLElement} */
const fragment = (templateId, parent, id) => {
  const frag = document.querySelector(templateId).content.cloneNode(true);
  /** @type HTMLElement */
  const result = frag.querySelector('section');
  if (id) { result.id = id; }
  document.querySelector(parent).appendChild(frag);
  return result;
};

/** @type {(
 *   templateId:string, 
 *   parent:string, 
 *   id:string, 
 *   name:string, 
 *   topRem:number, 
 *   leftRem:number
 * ) => {
 *  slot:HTMLElement, 
 *  moveCardTo:(card:Card) => void
 * }} */
const slot = (parent, id, name, topRem, leftRem) => {
  const slot = fragment('#slot', parent, id);
  slot.querySelector('#name').innerText = name;
  const moveCardTo = (card) => {
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  slot.onclick = () => {
    const draw = pick(cardList.filter(({ style }) =>
      slot.style.top != style.top &&
      slot.style.left != style.left
    ));
    if (!draw) return;
    state.draw = draw.id;
    draw.style.zIndex = ++ state.count;
    moveCardTo(draw);
  }
  return { slot, moveCardTo };
};

fragment('#empty', '#table');
const slotDeck = slot('#table', 'slot-deck', 'Deck', 1, 15);
const slotDrop = slot('#table', 'slot-drop', 'Drop', 1, 15 + 13.5);

const slotLine1 = slot('#incoming', 'slot-line-1', 'Line 1', 19.5, 1);
const slotLine2 = slot('#incoming', 'slot-line-1', 'Line 2', 19.5, 15);
const slotLine3 = slot('#incoming', 'slot-line-1', 'Line 3', 19.5, 15 + 13.5);
const slotLine4 = slot('#incoming', 'slot-line-1', 'Line 4', 19.5, 15 + 27);

const slotHero = slot('#player', 'slot-hero', 'Hero', 19 + 19, 1);
const slotAction1 = slot('#player', 'slot-Action1', 'Action1', 19 + 19, 15);
const slotAction2 = slot('#player', 'slot-Action1', 'Action1', 19 + 19, 15 + 13.5);
const slotStore1 = slot('#player', 'slot-Store1', 'Store1', 19 + 19, 15 + 27);

const pick = arr => arr[Math.random() * arr.length | 0];

const cardList = cardCollection
  .map(({ name: id, power }) => {
    const card = fragment('#card', "#desk", id);
    slotDeck.moveCardTo(card);
    card.style.backgroundPosition = pick(spriteSheet);
    card.querySelector('#name').innerHTML = id;
    card.querySelector('#power').innerHTML = power;
    return card;
  });

state.count = cardList.length;
// state.focus = cardList.at(-1);
// state.collection = cardCollection;

/** @type {(ms:number) => Promise<void>} */
const delay = (ms) => new Promise((release) => setTimeout(release, ms));

const dealCards = async () => {
  await delay(200);
  const captain = cardList.shift();
  slotHero.moveCardTo(captain)
  await delay(600);
  slotLine4.moveCardTo(cardList.at(-1))
  await delay(200);
  slotLine3.moveCardTo(cardList.at(-2))
  await delay(200);
  slotLine2.moveCardTo(cardList.at(-3))
  await delay(200);
  slotLine1.moveCardTo(cardList.at(-4))
}

dealCards();

/** @type {import('./alien').Card} */

// https://www.lambdatest.com/blog/best-javascript-frameworks/
// https://www.charlievuong.com/demystifing-tailwind-borders-outlines-and-rings