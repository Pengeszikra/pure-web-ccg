  //  A L I E N - S O L I T A R E   \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

// @ts-check

import { setup, cardCollection } from './alien.js';
import { zignal, monitor } from './old-bird-soft.js';
import { gameFlow } from './async-saga.js';

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

import { STATIC } from './old-bird-soft.js';
const fastDeck = structuredClone(cardCollection)
fastDeck[STATIC] = true;
alien.fastDeck = fastDeck;


const forntline = ["L1", "L2", "L3", "L4"];

const zipcard = ({name,power,maxPower,type,side}) => [power,maxPower,name,type,side].join('|');
const createDeck = () => alien.deck = cardCollection.map(zipcard) //.slice(0,11);
const shuffleCards = () => alien.deck.sort(() => Math.random() -0.5 );
const hero = () => alien.table.HERO = alien.deck.shift();
const dealCards = () => forntline
  .filter(slot => !alien.table[slot])
  .map(slot => alien.table[slot] = alien.deck.shift())

const thisIsTheEnd = () =>
  alien.deck.length === 0
  && !forntline.find(slot => !!alien.table[slot]);

const isSurvive = () => alien.table.HERO?.power > 0;

const conflict = (engage, guard) => {
  const [ePow, ...eRest] = engage.split('|');
  const [gPow, ...gRest] = guard.split('|');
  const [problem, solution] = [+ePow, +gPow];

  const gHealth = Math.max(solution - problem, 0);
  const eHealth = Math.max(problem - solution, 0);
  const eResult = `${eHealth}|${eRest.join('|')}`;
  const gResult = `${gHealth}|${gRest.join('|')}`;

  return {
    gHealth, eHealth,
    eResult, gResult,
  };
};

/** @type {(card:string) => number} */
const getPower = (card) => + card.split('|')?.[0];

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

// setTimeout(() => globalThis.saga(), 1000)
/** 
 * @typedef {{
 *  A1: null
 *  A2: null
 *  DECK: null
 *  DROP: null
 *  HERO: "12|12|Captain Co|HERO|ALLY"
 *  L1: "3|3|Robotic Ally|SPACE-SHIP|ALLY"
 *  L2: "7|7|Space Mine|GADGET|ALLY"
 *  L3: "5|5|Space Ranger|SPACE-SHIP|ALLY"
 *  L4: "10|10|Black Hole|LOCATION|STRANGE"
 *  S1: null
 * }} TableExmple
 */

/** @type {TableExmple} */
let tableExample;

/** @typedef {'L1' | 'L2' | 'L3' | 'L4' | HERO' | 'A1' | 'A2' | 'S1' | 'DROP' | 'DECK' } SlotId */
/** @typedef {'FRONT' | 'HERO' | 'ACTIVE' | 'STORE' | 'DROP' | 'DECK'} SlotKind */

const {table} = alien;
const frontLine = [table.L1, table.L2, table.L3, table.L4];
const active = [table.A1, table.A2];
/** @typedef {{card: string | null, id: SlotId, kind: SlotKind }} Slot */

/** @type {(from: Slot, to: Slot) => void} */
const showPossibleMoves = (from, to) => {
  possible(from, to)`
    FRONT:STRANGE |> HERO: ${engageCaptain}
    FRONT:STRANGE |> ACTIVE:GUARD ${engageGuard}
    ACTIVE:ENGAGE |> FRONT:STRANGE ${engageStrange}
    FRONT:FIX , STORE:FIX |> ACTIVE... ${fixCaptain}
    FRONT:WORTH |> ACTIVE... ${gainScore}
    FRONT:WORTH |> STORE... ${gainScore}
    FRONT:ENGAGE , FRONT:GUARD , FRONT:SKILL |> STORE... ${storeSomething}
    STORE:ENGAGE , STORE:GUARD , STORE:SKILL |> ACTIVE... ${prepare}
    FRONT:ENGAGE , FRONT:GUARD , FRONT:SKILL |> ACTIVE... ${prepare}
    FRONT:ALLY |> DROP ${dropSomething}
  `

  // Targeting means slots and cards for example front strange is means any front spot on any enemy card which named strange
  // Pipe operator Hero is spot on lower line. That card are represent your hero.
  // Engage captain means a function inserted to target template string.
  // Let's drink some coffee because I am so tired.

  targetting(from, to)`
    FRONT:STRANGE |> HERO: ${engageCaptain}
    FRONT:STRANGE |> ACTIVE:GUARD ${engageGuard}
    ACTIVE:ENGAGE |> FRONT:STRANGE ${engageStrange}
    FRONT:FIX |> ACTIVE... ${fixCaptain}
    STORE:FIX |> ACTIVE... ${fixCaptain}
    FRONT:WORTH |> ACTIVE... ${gainScore}
    FRONT:WORTH |> STORE... ${gainScore}
    FRONT:ENGAGE |> STORE... ${storeSomething}
    FRONT:GUARD |> STORE... ${storeSomething}
    FRONT:SKILL |> STORE... ${storeSomething}
    STORE:ENGAGE |> ACTIVE... ${prepare}
    STORE:GUARD |> ACTIVE... ${prepare}
    STORE:SKILL |> ACTIVE... ${prepare}
    FRONT:ENGAGE |> ACTIVE... ${prepare}
    FRONT:GUARD |> ACTIVE... ${prepare}
    FRONT:SKILL |> ACTIVE... ${prepare}
    FRONT:ALLY |> DROP ${dropSomething}
    ACTIVE:SKILL |> SLOT:CARD ${useSkill} // according skill targetting
  `
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

