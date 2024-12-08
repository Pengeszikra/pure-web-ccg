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
    setTimeout(() => card.style.transform = `translateZ(0)`, 100)
  }
  /** @type {(card:HTMLElement) => void} */
  const teleportCardTo = (card) => {
    card.parentElement.appendChild(card)
    card.style.top = `${topRem}rem`;
    card.style.left = `${leftRem}rem`;
  }
  slot.onclick = async () => {
    if (alien.fly?.id) {
      const found = alien.fly.moves
        .find(([, from, to]) => from.id == alien.fly.id && to.id == id)
      // console.log(found);
      if (found) {
        const {card} = alien.table[alien.fly.id];
        alien.table[alien.fly.id].card = null;
        alien.table[id] = {id, card};
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

/** @type {(range:number) => number} */
const rnd = (range) => (Math.random() * range) | 0;

const fly = () => {
  // @ts-ignore
  [...document.querySelectorAll('.card-front')].map(card =>
    setTimeout(() =>
    card.style.transform=`
      translateX(${rnd(40)-20}rem)
      translateZ(${rnd(10)-5}rem)
      translateY(${rnd(40)-20}rem)
      rotateY(${rnd(20)-10}deg)
    `,
    rnd(1000)
    )
  );
}

globalThis.fly = fly;


/** @type {(aZ?:number, aX?:number, scale?:number) => void} */
const board = (angleZ = 0, angleX = 30, scale = 0) => {
    // @ts-ignore
    document.querySelector("main#desk").style  = `
        transform-style: preserve-3d;
        transform:
          perspective(70vh)
          rotateX(${angleX}deg)
          rotateY(0deg)
          rotateZ(${angleZ}deg)
          scale(0.64)
          translateZ(${scale}rem);
        pointer-events: none;
    `;
    //@ts-ignore
    document.querySelector(".duck-girl").style = `
      transform: rotateX(-90deg) translateY(-10rem) rotateY(${angleZ}deg);
    `
}

board(0, 30);

globalThis.board = board;

const playWithTable = () => {
  alien.deck.map((id, idx) => render[id.split('|')[2]].card.style.transform = `
    translateZ(${(alien.deck.length - idx) / 5 }rem)
    translateX(${(alien.deck.length - idx) / 2 }rem)
    rotateY(${(alien.deck.length - idx) * 2}deg)
  `);
  let aZ = 0;
  let ss = setInterval( () => board(aZ += 1.3, 50), 15);
  setTimeout(() => {
    clearTimeout(ss)
  }, 3500);
  return ss;
}

globalThis.playWithTable = playWithTable;

document.getElementById("show-set").onclick = playWithTable;


// gimbRotateX.oninput = (e) => {
//   // @ts-ignore
//   document.querySelector('#rotateX + label').innerText = gimbRotateX.value;
//   board(+ gimbRotateX.value);
// }

/** @type {(id:string, setFunc?: function) => void} */
const gimbalRotate = (id, setFunc = () => {}) => {
  /** @type {HTMLInputElement} */
  const el = document.querySelector(id);
  // @ts-ignore
  document.querySelector(`${id} + label`).innerText = el.value;
  el.oninput = _ => {
    // @ts-ignore
    document.querySelector(`${id} + label`).innerText = el.value;
    setFunc(el.value);
  }
};

// @ts-ignore
gimbalRotate('#rotateX', v => board(v, + document.querySelector('#rotateY').value,  + document.querySelector('#rotateZ').value));
// @ts-ignore
gimbalRotate('#rotateY', v => board(+ document.querySelector('#rotateX').value, v, + document.querySelector('#rotateZ').value));
// @ts-ignore
gimbalRotate('#rotateZ', v => board(+ document.querySelector('#rotateX').value, + document.querySelector('#rotateY').value, v));

const addFloor = (id = Math.random().toString(36)) => {
  /** @type {HTMLElement} */
  const frg = fragment("#floor", "#desk", id);
  let [x, y] = [20, -10];
  let u = 0
  let v = 0;
  const move = (x, y) => frg.style.transform = `translate3D(${x}rem, ${y}rem, -.2rem) scale(1)`;
  move(x, y);
  let isDrag = false;
  frg.onmousedown = ({layerX, layerY}) => {
    u = layerX;
    v = layerY;
    isDrag = true;
  };
  frg.onmouseup = () => isDrag = false;
  frg.onmouseleave = () => isDrag = false;
  frg.onmousemove = ({layerX, layerY}) => {
    if (!isDrag) return;
    console.log(layerX - u, layerY - v)
    x += (layerX - u) / 100;
    y += (layerY - v) / 100;
    console.log(x, y)
    move(x, y)
  }
  frg.style.backgroundPosition = '0% 50%'
  return frg;
}
addFloor()
globalThis.addFloor = addFloor;
globalThis.fragment = fragment;


// ------ [ begin the game setup ]

setTimeout(() => {
  alien.deck.map((id, idx) => render[id.split('|')[2]].card.style.transform = `translateZ(${(alien.deck.length - idx) / 7 }rem)`)
}, 500);
setTimeout(() => goingForward(), 1000);
