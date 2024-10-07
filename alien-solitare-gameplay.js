  //  A L I E N - S O L I T A R E   \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

// @ts-check

import { setup } from './alien';

/** @typedef {import('./alien').State} State */
/** @typedef {import('./alien').Phases} Phases */

/** @type {State} */
const state = {};

const gameRule = async () => {
  state.phases = "BEGIN";
  await shuffleCards(state.deck);
  await hero(state.slotHero);
  state.phases = "STORY_GOES_ON"
  await dealCards(state.slotList);
  while (surviveOrBurnOut(state)) {
    state.phases = "SOLITARE"
    await playerMove(state);
  };
  state.phases = (isSurvive(state)) 
    ? "SURVIVE"
    : "BURN_OUT"
    ;
};

const playerMove = async (state) = {
  state
    .addHandler(selectCardInteraction | selectCardDemo )
    .effect(showPossibleMoves);
  
  state
    .addHandler(playCardInteraction | playCardDemo )
    .match(state, 
      {
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
      }
    )
    .calculateOutcome(state)
    .effect(renderAnimation)
    .effect(informPlayer);
};