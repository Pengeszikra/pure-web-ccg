  //  A L I E N - S O L I T A R E   \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

// @ts-check

import { setup, cardCollection } from './alien.js';
import { zignal, monitor, fragment, DIRECT, delay } from './old-bird-soft.js';

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

/** @typedef {'L1' | 'L2' | 'L3' | 'L4' | 'HE' | 'A1' | 'A2' | 'S1' | 'DR' | 'DK' } SlotId */
/** @typedef {'FRONT' | 'HERO' | 'ACTIVE' | 'STORE' | 'DROP' | 'DECK'} SlotKind */
/** 
 * @typedef { |
*  'FRONT' | 'STRANGE' | 'HERO' | 'ACTIVE' | 'STORE' | 'DROP' | 'DECK' |
*  'FIX' | 'WORTH' | 'GUARD' | 'SKILL' | 'ENGAGE' | 'NEUTRAL'
* } Keywords
*/

globalThis.setup = structuredClone(setup); // TODO remove

/** @type {State} */
const alien = zignal(monitor)(structuredClone({_over_:[],...setup}));
globalThis.alien = alien; // TODO remove

const { table } = alien;

/** @type {SlotId[]} */
const forntline = ["L1", "L2", "L3", "L4"];
/** @type {SlotId[]} */
const heroLine = ["HE", "A1", "A2", "S1"];
/** @type {SlotId[]} */
const activeLine = ["A1", "A2"];
/** @typedef {{idt:SlotId, card:string}} Slot */

const zipcard = ({ name, power, maxPower, type, side }) => [power, maxPower, name, type, side].join('|');
const createDeck = () => {
  const [hero,...zipCard] = cardCollection.map(zipcard);
  const shuffled = zipCard.sort(() => Math.random() - 0.5);
  alien.deck = [hero, ...shuffled];
}
const shuffleCards = () => alien.deck.sort(() => Math.random() - 0.5);
const emptyTable = () => [...forntline, ...heroLine, "DR", "DK"].map(
  slotId => alien.table[slotId] = {id:slotId, card: null});
const hero = () => alien.table.HE = ({id:'HE', card:alien.deck.shift()});
const dealCards = async () => {
  /** @type {SlotId[]} */
  const emptySlot = forntline.filter(id => !alien.table[id].card)
  for(const id of emptySlot) {
    alien.table[id] = {id,card:alien.deck.shift()}
    await delay(400);
  }
}

const thisIsTheEnd = () =>
  alien.deck.length === 0
  && forntline.find(slot => alien.table[slot].card === null);

const isSurvive = () => alien.table.HERO?.card?.power > 0;

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

const gameAnimation = (prop, prev, next) => {
  try {
    if (next?.card || next?.length) {
      const [,, cardNameId] = !next.card
        ? next.split('|')
        : next.card.split('|')
      ts[prop].moveCardTo(render[cardNameId].card)
    }
  } catch (error) {
    console.log(error)
  }
}

const gameRule = () => {
  alien.phases = "BEGIN";
  const start = performance.now()
  emptyTable();
  createDeck();
  alien.table[DIRECT] = gameAnimation;
}

const goingForward = async () => {
  hero();
  await delay(600);
  alien.phases = "STORY_GOES_ON"
  dealCards();
};
globalThis.goingForward = goingForward;
gameRule()

/** @type {(from:Slot, query: Keywords) => boolean} */
const front = (from, query) => 
  forntline.includes(from.id) 
  && from.card.includes(query)

/** @type {(from:Slot, query: Keywords) => boolean} */
const active = (from, query) => 
  activeLine.includes(from.id) 
  && from.card.includes(query);

/** @type {(to:Slot, check: Keywords) => boolean} */
const toCheck = (to, check) => to.card === null ? false : to.card.includes(check);

/** @type {(from:Slot, check: Keywords) => boolean} */
const fromStore = (from, check) => from.id === "S1" && from.card.includes(check);

/** @type {(to:Slot) => boolean} */
const toEmptyActive = (to) => activeLine.includes(to.id) && to.card === null;

/** @type {(to:Slot) => boolean} */
const toEmptyStore = (to) => to.id === "S1" && to.card === null;

/** @type {(to:Slot) => boolean} */
const toDrop = (to) => to.id === "DR";

/** @type {(from: Slot, to: Slot) => [function, Slot, Slot] | null} */
const moveByRule = (from, to) => {
  if (from.card === null) return null;
  if (front(from, "STRANGE") && toCheck(to, "HERO")) return [engageCaptain, from, to];
  if (front(from, "STRANGE") && toCheck(to, "GUARD")) return [engageGuard, from, to];
  if (active(from,"ENGAGE") && toCheck(to, "STRANGE")) return [engageStrange, from, to];
  if (front(from, "FIX") && toEmptyActive(to)) return [fixCaptain, from, to];
  if (fromStore(from, "FIX") && toEmptyActive(to)) return [fixCaptain, from, to];
  if (front(from, "WORTH") && toEmptyActive(to)) return [gainScore, from, to];
  if (front(from, "WORTH") && toEmptyStore(to)) return [gainScore, from, to];
  if (
    toEmptyStore(to) && (
         front(from, "ALLY") 
      || front(from, "NEUTRAL")
      || front(from, "SKILL")
    )
  ) return [storeSomething, from, to];
  if (
    toEmptyActive(to) && (
         fromStore(from, "ALLY")
      || fromStore(from, "NEUTRAL")
      || fromStore(from, "SKILL")
      || front(from, "ALLY")
      || front(from, "NEUTRAL")
      || front(from, "SKILL")
    )
  ) return [prepare, from, to];
  if ((
         fromStore(from, "ALLY")
      || fromStore(from, "NEUTRAL")
      || fromStore(from, "SKILL")
      || front(from, "ALLY")
      || front(from, "NEUTRAL")
      || front(from, "SKILL")
    ) && toDrop(to)
  ) return [dropSomething, from, to];

  return null;
};
globalThis.moveByRule = moveByRule; // TODO remove

/** @type {(slot:Slot) => [function, Slot, Slot]} */
const moveMap = (slot) => Object.keys(alien.table).map(
  key => moveByRule(slot, alien.table[key])
).filter(p => p)
.map(([fun,from,to]) => [fun?.name, from, to])
globalThis.moveMap = moveMap; // TODO remove

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