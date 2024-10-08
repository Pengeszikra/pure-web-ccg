// @ts-check - interesting in linux VS-Code this linting are working. Maybe some settings or plugin diff cause the distinque behaviour

// A single step to move this code out from file
// which means easy to modularize javascript
// even without building.
// this is help to using jsDoc in code a proper way.

import { cardCollection, setup } from "./alien.js"

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
 * with this type declaration it will be working as expected.
 *
 * @type {<T>(middleware?:function) => (state?:T | object) => T}
 */
export const signal = (middleware = () => {}) => (state={}) => Proxy.revocable(
  state,
  {
    get: (obj, prop) => obj[prop],
    set: (obj, prop, value) => {
      const middle = middleware(obj, prop, value);
      obj[prop] = middle ?? value;
      return true;
    }
  })
.proxy;

const setLog = (obj, prop, value) => console.log(obj, prop, value);
// a perfect type importing and reuse as composed type

/** @typedef {import('./alien').State & {count:number, draw:object | null}} State */

/** @type {State} */
const state = signal(monitor)();
state.count = 0;


const view = signal()();
view.deck = signal()()
view.slotList = {}

/** @type {(templateId:string, parent:string, id?:string) => HTMLElement} */
const fragment = (templateId, parent, id) => {
  // @ts-ignore
  const frag = document.querySelector(templateId).content.cloneNode(true);
  /** @type HTMLElement */
  const result = frag.querySelector('section');
  if (id) { result.id = id; }
  // @ts-ignore
  document.querySelector(parent).appendChild(frag);
  return result;
};

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
  // @ts-ignore
  slot.querySelector('#name').innerText = name;
  const moveCardTo = (card) => {
    // card.style.zIndex = (state.count += 10).toString();
    // await delay(20);
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  slot.onclick = async () => {
    const draw = pick(cardList.filter(({ style }) =>
      slot.style.top + ':' + slot.style.left
      !==
      style.top + ':' + style.left
    ));
    if (!draw) return;
    draw.style.zIndex = (state.count += 10).toString();
    await delay(100);
    state.draw = draw.id;
    // moveCardTo(draw);
    // instead a wrong reactive way
    view.deck[draw.id].mov = view.slotList[id]
  }
  return { slot, moveCardTo, topRem, leftRem };
};

fragment('#empty', '#table');
const slotDeck = slot('#table', 'slotDeck', 'Deck', 1, 15);
const slotDrop = slot('#table', 'slotDrop', 'Drop', 1, 15 + 13.5);

const slotLine1 = slot('#incoming', 'slotLine1', 'Line 1', 19.5, 1);
const slotLine2 = slot('#incoming', 'slotLine2', 'Line 2', 19.5, 15);
const slotLine3 = slot('#incoming', 'slotLine3', 'Line 3', 19.5, 15 + 13.5);
const slotLine4 = slot('#incoming', 'slotLine4', 'Line 4', 19.5, 15 + 27);

const slotHero = slot('#player', 'slotHero', 'Hero', 19 + 19, 1);
const slotAction1 = slot('#player', 'slotAction1', 'Action 1', 19 + 19, 15);
const slotAction2 = slot('#player', 'slotAction2', 'Action 2', 19 + 19, 15 + 13.5);
const slotStore1 = slot('#player', 'slotStore1', 'Store 1', 19 + 19, 15 + 27);

view.slotList = {
  slotDeck,
  slotDrop,
  slotLine1,
  slotLine2,
  slotLine3,
  slotLine4,
  slotHero,
  slotAction1,
  slotAction2,
  slotStore1,
}

const pick = arr => arr[Math.random() * arr.length | 0];

const cardMiddleware = (obj, prop, value) => {
  // console.log(obj, prop, value)
  if (prop === 'mov') {
    obj.card.style.zIndex = (state.count += 10).toString();
    value.moveCardTo(obj.card);
    return {...obj, [prop]: [value.slot.id, value.topRem, value.leftRem]};
  }

  return value;
}

const cardList = cardCollection
  .map(({ name: id, power }, index) => {
    const card = fragment('#card', "#desk", id)

    view.deck ??= {};
    view.deck[card.id] = signal(cardMiddleware)({card})

    // slotDeck.moveCardTo(card);
    view.deck[card.id].mov = view.slotList.slotDeck;

    card.style.backgroundPosition = spriteSheet[index % spriteSheet.length]  // pick(spriteSheet);
    // @ts-ignore
    card.querySelector('#name').innerHTML = id;
    // @ts-ignore
    card.querySelector('#power').innerHTML = power;
    return card;
  });

state.count = cardList.length;
// state.focus = cardList.at(-1);
// state.collection = cardCollection;

/** @type {(ms:number) => Promise<void>} */
const delay = (ms) => new Promise((release) => setTimeout(release, ms));

const dealCards = async () => {
  const captain = cardList.shift();
  if (captain) {
    captain.style.zIndex = (state.count += 10).toString();
    await delay(200);
    slotHero.moveCardTo(captain)
  }
  await delay(600);
  slotLine4.moveCardTo(cardList[cardList.length-1]);
  await delay(200);
  slotLine3.moveCardTo(cardList[cardList.length-2]);
  await delay(200);
  slotLine2.moveCardTo(cardList[cardList.length-3]);
  await delay(200);
  slotLine1.moveCardTo(cardList[cardList.length-4]);
}

dealCards();

const slash = (a,b) => a.map((ae,ai) => b?.[ai] ? [ae, b[ai]] : [ae]).flat().join('|');

globalThis.view = view;
globalThis.slash = slash;
globalThis.state = state;
globalThis.cardList = cardList;

// https://www.lambdatest.com/blog/best-javascript-frameworks/
// https://www.charlievuong.com/demystifing-tailwind-borders-outlines-and-rings
// https://dtm.uk/wasm/
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
// https://openart.ai/create?ai_model=OpenArt_DnD&prompt=Character+design+sheet+woman+blue-pink+ponytail+black+leather+vest+with+yellow+accents%2Ctattoos
// https://stabledifffusion.com/tools/ai-image-generator

const image_prompt = `
sprite sheets of cards, composition: 5 x 4 grid, aspect ratio of each cards is same: 4/6 

style: detailed crafted cut fantasy art

Theme: alien invasion and space adventure moody Haroshi nagai inspired line art comic art with Syd Mead and Keith Parkinson, images on card in list: spaceship, alien, planet, gadget, scene, species, inner place of space ship, blast, scientic stuff, humanoid hero
`