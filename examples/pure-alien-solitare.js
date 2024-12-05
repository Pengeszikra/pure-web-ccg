// @ts-check - interesting in linux VS-Code this linting are working. Maybe some settings or plugin diff cause the distinque behaviour

// A single step to move this code out from file
// which means easy to modularize javascript
// even without building.
// this is help to using jsDoc in code a proper way.

import { cardCollection } from "../src/alien.js";
import { signal, monitor, delay } from "../src/old-bird-soft.js";

const spriteSheet = [4, 26, 50, 74, 96]
  .map((horizontal) =>
    [4, 36, 69, 103].map((vertical) => `${horizontal}% ${vertical}%`),
  )
  .flat();

// const setLog = (obj, prop, value) => console.log(obj, prop, value);
// a perfect type importing and reuse as composed type

/** @typedef {import('../src/alien').State & {count:number, draw:object | null}} State */

/** @type {State} */
const state = signal()();
state.count = 0;

const view = signal(monitor)();
view.deck = {};

/** @type {(templateId:string, parent:string, id?:string) => HTMLElement} */
const fragment = (templateId, parent, id) => {
  // @ts-ignore
  const frag = document.querySelector(templateId).content.cloneNode(true);
  /** @type HTMLElement */
  const result = frag.querySelector("section");
  if (id) {
    result.id = id;
  }
  document.querySelector(parent)?.appendChild(frag);
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
  const slot = fragment("#slot", parent, id);
  // @ts-ignore
  slot.querySelector("#name").innerText = name;
  // if (id === "HE") {slot.dataset.possible = 1}
  const moveCardTo = async (card) => {
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  };
  slot.onclick = async () => {
    const draw = pick(
      cardList.filter(
        ({ style }) =>
          slot.style.top + ":" + slot.style.left !==
          style.top + ":" + style.left,
      ),
    );
    if (!draw) return;
    state.draw = draw.id;
    document.querySelector("#desk")?.appendChild(draw);
    draw.style.zIndex = (state.count += 10).toString();
    await delay(100);
    view.deck[draw.id].mov = view.slotList[id];
  };
  slot.onmouseover = async () => {
    try {
      alien._over_ = moveMap(alien.table[id]);
      alien._over_.map(
        ([, , target]) =>
          (view.slotList[target.slot].slot.dataset.possible = 1),
      );
    } catch (error) {
      alien._over_ = error;
    }
  };

  slot.onmouseleave = async () => {
    try {
      Object.values(view.slotList).map(({ slot }) =>
        slot.removeAttribute("data-possible"),
      );
    } catch (error) {
      console.warn(error);
    }
  };
  return { slot, moveCardTo, topRem, leftRem };
};

fragment("#empty", "#table");
const DK = slot("#table", "DK", "Deck", 1, 15);
const DR = slot("#table", "DR", "Drop", 1, 15 + 13.5);

const L1 = slot("#incoming", "L1", "Line 1", 19.5, 1);
const L2 = slot("#incoming", "L2", "Line 2", 19.5, 15);
const L3 = slot("#incoming", "L3", "Line 3", 19.5, 15 + 13.5);
const L4 = slot("#incoming", "L4", "Line 4", 19.5, 15 + 27);

const HE = slot("#player", "HE", "Hero", 19 + 19, 1);
const A1 = slot("#player", "A1", "Action 1", 19 + 19, 15);
const A2 = slot("#player", "A2", "Action 2", 19 + 19, 15 + 13.5);
const S1 = slot("#player", "S1", "Store 1", 19 + 19, 15 + 27);

view.slotList = {
  DK,
  DR,
  L1,
  L2,
  L3,
  L4,
  HE,
  A1,
  A2,
  S1,
};

const pick = (arr) => arr[(Math.random() * arr.length) | 0];

const cardMiddleware = (obj, prop, value) => {
  // console.log(obj, prop, value)
  if (prop === "mov") {
    obj.card.style.zIndex = (state.count += 10).toString();
    value.moveCardTo(obj.card);
    return { ...obj, [prop]: [value.slot.id, value.topRem, value.leftRem] };
  }

  return value;
};

const cardList = cardCollection.map(({ name: id, power }, index) => {
  const card = fragment("#card", "#desk", id);
  view.deck[card.id] = signal(cardMiddleware)({ card });
  view.deck[card.id].mov = view.slotList.DK;
  card.style.backgroundPosition = spriteSheet[index % spriteSheet.length]; // pick(spriteSheet);
  card.querySelector("#name").innerHTML = id;
  card.querySelector("#power").innerHTML = power.toString();
  return card;
});

const dealCards = async () => {
  const captain = cardList.shift();
  if (captain) {
    captain.style.zIndex = (state.count += 10).toString();
    await delay(200);
    HE.moveCardTo(captain);
  }
  await delay(600);
  L4.moveCardTo(cardList[cardList.length - 1]);
  await delay(200);
  L3.moveCardTo(cardList[cardList.length - 2]);
  await delay(200);
  L2.moveCardTo(cardList[cardList.length - 3]);
  await delay(200);
  L1.moveCardTo(cardList[cardList.length - 4]);
};

dealCards();

globalThis.view = view;
globalThis.state = state;
globalThis.cardList = cardList;
globalThis.signal = signal;
globalThis.cardCollection = cardCollection;
globalThis.monitor = monitor;

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
`;

document.getElementById("show-set").onclick = (e) => {
  document.getElementById("show-set").style.top = '1rem'
  console.log(e);
  
}


// document.querySelector('.card-front').style.transform="translateX(0rem) translateZ(0rem) translateY(37rem)"

// document.querySelector('.card-front').style.transform="translateX(13rem) translateZ(15rem) translateY(37rem) rotateY(45deg)"