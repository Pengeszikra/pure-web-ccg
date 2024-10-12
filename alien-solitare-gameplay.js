  //  A L I E N - S O L I T A R E   \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

// @ts-check

import { setup, cardCollection } from './alien.js';
import { zignal, monitor } from './old-bird-soft.js';

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

const alien = zignal(monitor)(structuredClone(setup));

/** @type {AlienState} */
const bill = signal(monitor)(structuredClone(setup));

const shuffleCards = (deck) => deck;
const hero = (slot) => slot;
const dealCards = (solts) => solts;
const surviveOrBurnOut = (state) => state;
const isSurvive = (state) => state;

const gameRule = async () => {
  alien.phases = "BEGIN";
  await shuffleCards(alien.deck);
  await hero(alien.table.HERO);
  alien.phases = "STORY_GOES_ON"
  await dealCards(alien.table);
  while (surviveOrBurnOut(alien)) {
    alien.phases = "SOLITARE"
    await playerMove(alien);
  };
  alien.phases = (isSurvive(alien))
    ? "SURVIVE"
    : "BURN_OUT"
    ;
};

const selectCardInteraction = () => { };
const selectCardDemo = () => { };
const showPossibleMoves = () => { };
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

/** @type {<T>(alien:AlienState) => void} */
const playerMove = (alien) => {
  alien.addHandler = selectCardInteraction; // | selectCardDemo)
  alien.effect = showPossibleMoves;

  alien.addHandler = playCardInteraction; // | playCardDemo)
  alien.match = [
    engageCaptain`LINE`,
    engageGuard`LINE`,
    engageEmptyActive`LINE`,
    engageStrange`ACT`,
    fixCaptain`LINE, STORE | FIX`,
    useSkill`ACTIVE, STORE`,
    gainScore`LINE, STORE | WORTH`,
    storeSomething`LINE`,
    dropSomething`LINE, STORE`,
    prepare`LINE, STORE`,
  ];
  alien.calculateOutcome(state)
  alien.effect(renderAnimation)
  alien.effect(informPlayer);

};

// alien.deck = Object.values(cardCollection).map(({name, power, maxPower, type, id, side}) => ({name, power, maxPower, type, id, side}));
// alien.slots = {...view.slotList};
globalThis.alien = alien;
globalThis.bill = bill;

/**
 * I love how this playcode.io are working
 * and this is a great place to show
 * how woking the jsDoc so into my post
 * I can insert a playcode link for a
 * better understanding
 * also good for a pure-web showplace
 * even fine for a teaching stuff.
 * 
 * bomud: this is also working on my TCS laptop
 * at least one unbloced online IDE !!!
 * which is capable to pair working.
 */ 

 
 