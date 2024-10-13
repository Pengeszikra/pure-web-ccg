  //  A L I E N - S O L I T A R E   \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

// @ts-check

import { setup, cardCollection } from './alien.js';
import { zignal, monitor } from './old-bird-soft.js';
import { gameFlow } from './async-saga';

/** @typedef {import('./alien').State} State */
/** @typedef {import('./alien').Phases} Phases */

/**
 * @typedef {State & {
 *  addHandler: (p:any) => any,
 *  effect: (p:any) => any,
 *  match: any[],
 *  calculateOutcome: (p:any) => any,
 * }} AlienState
 */

globalThis.setup = structuredClone(setup);

/** @type {State} */
const alien = zignal(monitor)(structuredClone(setup));
alien.foo = 'bizz-bazz'
globalThis.alien = alien;


// alien.deck=structuredClone(cardCollection)


const forntline = ["L1", "L2", "L3", "L4"];

const zipcard = ({name,power,maxPower,type,side}) => [power,maxPower,name,type,side].join('|');
const createDeck = () => alien.deck = cardCollection.map(zipcard).slice(0,11);
const shuffleCards = () => alien.deck.sort(() => Math.random() > .5 ? -1 : 1);
const hero = () => alien.table.HERO = alien.deck.shift();
const dealCards = () => forntline
  .filter(slot => !alien.table[slot])
  .map(slot => alien.table[slot] = alien.deck.shift())

const thisIsTheEnd = () =>
  alien.deck.length === 0
  && !forntline.find(slot => !!alien.table[slot]);

const isSurvive = () => alien.table.HERO?.power > 0;

const gameRule = () => {
  alien.phases = "BEGIN";
  const start = performance.now()
  createDeck();
  hero();
  shuffleCards();
  alien.phases = "STORY_GOES_ON"
  dealCards();
  console.log ('zipped card  helps:',performance.now()-start)
  // while (!thisIsTheEnd(alien)) {
  //   alien.phases = "SOLITARE"
  //   playerMove(alien);
  // };
  alien.phases = (isSurvive(alien))
    ? "SURVIVE"
    : "BURN_OUT"
    ;
};

gameRule()

setTimeout(() => globalThis.saga(), 1000)

const showPossibleMoves = () => {
  return Object.keys(alien.table).join(',');
 };
const selectCardInteraction = (possible) => prompt(`Play the next move (${possible})`);
const selectCardDemo = () => { };
const playCardInteraction = () => { };
const renderAnimation = () => { };
const informPlayer = () => { };

const engageCaptain = (p) => p;
const engageGuard = (p) => p;
const engageEmptyActive = (p) => p;
const engageStrange = (p) => p;
const fixCaptain = (p) => p;
const useSkill = (p) => p;
const gainScore = (p) => p;
const storeSomething = (p) => p;
const dropSomething = (p) => p;
const prepare = (p) => p;

const playerMove = () => {
  const move = selectCardInteraction(showPossibleMoves());
  // alien.effect = showPossibleMoves;
  // alien.addHandler = playCardInteraction; // | playCardDemo)
  // alien.match = [
  //   engageCaptain`LINE`,
  //   engageGuard`LINE`,
  //   engageEmptyActive`LINE`,
  //   engageStrange`ACT`,
  //   fixCaptain`LINE, STORE | FIX`,
  //   useSkill`ACTIVE, STORE`,
  //   gainScore`LINE, STORE | WORTH`,
  //   storeSomething`LINE`,
  //   dropSomething`LINE, STORE`,
  //   prepare`LINE, STORE`,
  // ];
  // alien.calculateOutcome(state)
  // alien.effect(renderAnimation)
  // alien.effect(informPlayer);
  // return new Promise(move)
};

globalThis.saga = gameFlow
globalThis.gameRule = gameRule