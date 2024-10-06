/**
 * Dictionary
 * 
 * @typedef {'HERO' | 'ALIEN' | 'SPACE-SHIP' | 'LOCATION' | 'GADGET' | 'STORY' } Kind
 * @typedef {'GUARD' | 'ENGAGE' | 'FIX' | 'SKILL' | 'WORTH'} Work
 * @typedef {'ALLY' | 'STRANGE' | 'NEUTRAL'} Side
 * @typedef {'LINE' | 'HERO' | 'ACTIVE' | 'STORE' | 'DROP' | 'DECK' } Slot
 */

/** 
 * @typedef {{
*   id: string,
*   name: string,
*   power: number,
*   maxPower: number,
*   actionSlot: number,
*   storeSlot: number,
*   type: Kind,
*   work: Work,
*   side: Side,
*   src: string;
*   rule: string;
* }} Card
*/

/**
* Keys of Slots or Spots I was mixing this a bit.
* TODO: L5, L6, A3, S2 :: Space-ship / Location dynamic table size feature
* 
*  @typedef { 'DECK' | 'DROP' | 
*     'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 
*   'HERO' | 'A1' | 'A2' | 'A3' | 'S1' | 'S2'
* } SlotId
*/

/**
* This is represent the whole game are
* 
* @typedef {{
*  id: SlotId,
*  slot: Slot,
*  card: Card | null,
* }} TableSpot
*/

/** 
* STORY_GOES_ON & SOLITARE :: game rounds
* 
* BURN_OUT means the problems are owervhelming us :: THE-END
* 
* SURVIVE  means we capable to handle the problem :: HAPPY-END
* 
* @typedef { |
*  'BEGIN' | 
*  'STORY_GOES_ON' | 'SOLITARE' | 
*  'BURN_OUT' | 'SURVIVE' 
* } Phases 
*/

/**
* @typedef { Record<SlotId, TableSpot } Table
*/

/**
* @typedef {{
* deck: Card[],
* lost: Card[],
* fly: { from: SlotId, to?: SlotId, card: Card },
* table: Table,
* phases: Phases,
* score: number,
* help: boolean,
* }} State
*/

/**
* @typedef { |
* { type: "CREATE_DECK", payload: Card[] } |
* { type: "SHUFFLE_DECK" } |
* { type: "RELEASE_CARD", payload: SlotId } |
* { type: "DRAG_START", payload: {from:SlotId, card:Card} } |
* { type: "MOVE_CARD", payload: Card } |
* { type: "DRAG_END", payload: SlotId } |
* { type: "PLAY_CARD", payload: {actor:Card, slotId:SlotId } } |
* { type: "GO_ON", payload: Phases } |
* { type: "CLEAN_TABLE" } |
* { type: "HELP_SWITCH" } |
* { type: "WHAT_IS_NEXT" }
* } Actions
*/

/** @type {Card[]} */
export const cardCollection = [
 {
   "id": "c001",
   "name": "Captain Co",
   "power": 12,
   "maxPower": 12,
   "actionSlot": 2,
   "storeSlot": 1,
   "type": "HERO",
   "work": "GUARD",
   "side": "ALLY",
   "src": "WFESacEk.jpg",
   "rule": "Deals damage equal to power to the hero."
 },
 {
   "id": "c002",
   "name": "Cosmic Defender",
   "power": 10,
   "maxPower": 10,
   "actionSlot": 1,
   "storeSlot": 0,
   "type": "SPACE-SHIP",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "CrQogMQa.jpg",
   "rule": "Blocks an attack from an ALIEN."
 },
 {
   "id": "c003",
   "name": "Asteroid Field",
   "power": 6,
   "maxPower": 6,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "7tKsrA4o.jpg",
   "rule": "Aliens passing through lose 1 power."
 },
 {
   "id": "c004",
   "name": "Laser Blaster",
   "power": 3,
   "maxPower": 3,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "ENGAGE",
   "side": "ALLY",
   "src": "3rhpIDkX.jpg",
   "rule": "Use to deal 2 damage to an ALIEN."
 },
 {
   "id": "c005",
   "name": "Alien Overlord",
   "power": 10,
   "maxPower": 10,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "MFf7f6S6.jpg",
   "rule": "Deals heavy damage to the hero."
 },
 {
   "id": "c006",
   "name": "Space Pirate",
   "power": 9,
   "maxPower": 9,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "LJt62y5T.jpg",
   "rule": "Steals one GADGET from the hero."
 },
 {
   "id": "c007",
   "name": "Healing Pod",
   "power": 7,
   "maxPower": 7,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "FIX",
   "side": "ALLY",
   "src": "3jzIhgV2.jpg",
   "rule": "Restores 3 power to the hero."
 },
 {
   "id": "c008",
   "name": "Galactic Map",
   "power": 5,
   "maxPower": 5,
   "actionSlot": 0,
   "storeSlot": 1,
   "type": "GADGET",
   "work": "GUARD",
   "side": "ALLY",
   "src": "YDBYvyNc.jpg",
   "rule": "Reveals the next 3 cards in the deck."
 },
 {
   "id": "c009",
   "name": "Alien Symbiote",
   "power": 9,
   "maxPower": 9,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "2VCCM4hJ.jpg",
   "rule": "Reduces hero's power by 1 each turn."
 },
 {
   "id": "c010",
   "name": "Space Station",
   "power": 7,
   "maxPower": 7,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "GUARD",
   "side": "ALLY",
   "src": "3MDiwpKI.jpg",
   "rule": "Hero can rest here to restore power."
 },
 {
   "id": "c011",
   "name": "Energy Shield",
   "power": 6,
   "maxPower": 6,
   "actionSlot": 0,
   "storeSlot": 1,
   "type": "GADGET",
   "work": "GUARD",
   "side": "ALLY",
   "src": "Du0nURnc.jpg",
   "rule": "Blocks the next attack completely."
 },
 {
   "id": "c012",
   "name": "Alien Hatchling",
   "power": 2,
   "maxPower": 2,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "8rFa4ho0.jpg",
   "rule": "Weak but can grow stronger."
 },
 {
   "id": "c013",
   "name": "Black Hole",
   "power": 10,
   "maxPower": 10,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "95uKbPbt.jpg",
   "rule": "Destroys all cards in play."
 },
 {
   "id": "c014",
   "name": "Quantum Drive",
   "power": 4,
   "maxPower": 4,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "WORTH",
   "side": "ALLY",
   "src": "2EnvGU66.jpg",
   "rule": "Skip the next ALIEN card."
 },
 {
   "id": "c015",
   "name": "Alien Queen",
   "power": 8,
   "maxPower": 8,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "gyjkK6gX.jpg",
   "rule": "Spawns Alien Hatchlings."
 },
 {
   "id": "c016",
   "name": "Space Merchant",
   "power": 2,
   "maxPower": 2,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "GUARD",
   "side": "ALLY",
   "src": "5rKh7lPh.jpg",
   "rule": "Trade GADGETS for power."
 },
 {
   "id": "c017",
   "name": "Meteor Shower",
   "power": 8,
   "maxPower": 8,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "IkloOCVi.jpg",
   "rule": "All players lose 2 power."
 },
 {
   "id": "c018",
   "name": "Robotic Ally",
   "power": 3,
   "maxPower": 3,
   "actionSlot": 1,
   "storeSlot": 0,
   "type": "SPACE-SHIP",
   "work": "FIX",
   "side": "ALLY",
   "src": "4t0c0vrr.jpg",
   "rule": "Adds 3 power to hero for one turn."
 },
 {
   "id": "c019",
   "name": "Space Mine",
   "power": 7,
   "maxPower": 7,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "WORTH",
   "side": "ALLY",
   "src": "rRkNb7YU.jpg",
   "rule": "Deals 3 damage to next ALIEN."
 },
 {
   "id": "c020",
   "name": "Alien Scout",
   "power": 5,
   "maxPower": 5,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "p49TjcMJ.jpg",
   "rule": "Reveals one of your GADGETS."
 },
 {
   "id": "c021",
   "name": "Nebula Cloud",
   "power": 4,
   "maxPower": 4,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "GUARD",
   "side": "ALLY",
   "src": "TLczuPqB.jpg",
   "rule": "All players have reduced visibility."
 },
 {
   "id": "c022",
   "name": "Time Warp",
   "power": 0,
   "maxPower": 0,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "STORY",
   "work": "SKILL",
   "side": "ALLY",
   "src": "xCaTEai5.jpg",
   "rule": "Repeat the last action."
 },
 {
   "id": "c023",
   "name": "Plasma Cannon",
   "power": 5,
   "maxPower": 5,
   "actionSlot": 1,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "ENGAGE",
   "side": "ALLY",
   "src": "GboqJsxC.jpg",
   "rule": "Deal 5 damage to an ALIEN."
 },
 {
   "id": "c024",
   "name": "Alien Warrior",
   "power": 4,
   "maxPower": 4,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "yxuLi5ua.jpg",
   "rule": "Strong attacker."
 },
 {
   "id": "c025",
   "name": "Wormhole",
   "power": 5,
   "maxPower": 5,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "FrMwlVRq.jpg",
   "rule": "Swap positions with another card."
 },
 {
   "id": "c026",
   "name": "Alien Artifact",
   "power": 10,
   "maxPower": 10,
   "actionSlot": 0,
   "storeSlot": 1,
   "type": "GADGET",
   "work": "WORTH",
   "side": "ALLY",
   "src": "KUFfxrBB.jpg",
   "rule": "Gain a random effect."
 },
 {
   "id": "c027",
   "name": "Solar Flare",
   "power": 2,
   "maxPower": 2,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "CMjw98mh.jpg",
   "rule": "All players lose action slots for one turn."
 },
 {
   "id": "c028",
   "name": "Space Ranger",
   "power": 5,
   "maxPower": 5,
   "actionSlot": 1,
   "storeSlot": 0,
   "type": "SPACE-SHIP",
   "work": "FIX",
   "side": "ALLY",
   "src": "wnhtC5OX.jpg",
   "rule": "Defeats any ALIEN with power less than 5."
 },
 {
   "id": "c029",
   "name": "Alien Spy",
   "power": 3,
   "maxPower": 3,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "AfVDAITd.jpg",
   "rule": "Reveals hero's hand."
 },
 {
   "id": "c030",
   "name": "Ion Storm",
   "power": 3,
   "maxPower": 3,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "xKgRpZYB.jpg",
   "rule": "All GADGETS are disabled for one turn."
 },
 {
   "id": "c031",
   "name": "Holographic Decoy",
   "power": 3,
   "maxPower": 3,
   "actionSlot": 0,
   "storeSlot": 1,
   "type": "GADGET",
   "work": "GUARD",
   "side": "ALLY",
   "src": "BMXcUkhS.jpg",
   "rule": "Next attack targets the decoy."
 },
 {
   "id": "c032",
   "name": "Alien Slime",
   "power": 2,
   "maxPower": 2,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "WORTH",
   "side": "ALLY",
   "src": "Dq9rRl0i.jpg",
   "rule": "Reduces hero's action slots by 1."
 },
 {
   "id": "c033",
   "name": "Dr. Anomaly",
   "power": 9,
   "maxPower": 9,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "FIX",
   "side": "ALLY",
   "src": "160W9Z6q.jpg",
   "rule": "Random event occurs."
 },
 {
   "id": "c034",
   "name": "Don Grox",
   "power": 4,
   "maxPower": 4,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "ALLY",
   "src": "53feRqsn.jpg",
   "rule": "All cards move one spot backward."
 },
 {
   "id": "c035",
   "name": "Alien Berserker",
   "power": 6,
   "maxPower": 6,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "N0w6xcll.jpg",
   "rule": "Attacks twice per turn."
 },
 {
   "id": "c036",
   "name": "Space Explorer",
   "power": 6,
   "maxPower": 6,
   "actionSlot": 1,
   "storeSlot": 0,
   "type": "SPACE-SHIP",
   "work": "ENGAGE",
   "side": "ALLY",
   "src": "SmBTlA6x.jpg",
   "rule": "Allows drawing an extra card."
 },
 {
   "id": "c037",
   "name": "Urgent Surgery",
   "power": 0,
   "maxPower": 0,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "STORY",
   "work": "SKILL",
   "side": "ALLY",
   "src": "CkFTVlkm.jpg",
   "rule": "Hero loses 1 power per turn."
 },
 {
   "id": "c038",
   "name": "Comet",
   "power": 2,
   "maxPower": 2,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "STORY",
   "work": "ENGAGE",
   "side": "ALLY",
   "src": "Y6T6h4Au.jpg",
   "rule": "Deals 3 damage to all."
 },
 {
   "id": "c039",
   "name": "Alien Psychic",
   "power": 4,
   "maxPower": 4,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "ENGAGE",
   "side": "STRANGE",
   "src": "HQIcBKcd.jpg",
   "rule": "Controls hero's next move."
 },
 {
   "id": "c040",
   "name": "Interstellar Map",
   "power": 0,
   "maxPower": 0,
   "actionSlot": 0,
   "storeSlot": 1,
   "type": "GADGET",
   "work": "SKILL",
   "side": "ALLY",
   "src": "BX0P5LFv.jpg",
   "rule": "Allows choosing the next card."
 },
 {
   "id": "c041",
   "name": "Supernova",
   "power": 7,
   "maxPower": 7,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "STORY",
   "work": "ENGAGE",
   "side": "ALLY",
   "src": "0o3M5uG4.jpg",
   "rule": "All cards in play are destroyed."
 },
 {
   "id": "c042",
   "name": "Alien Ambassador",
   "power": 4,
   "maxPower": 4,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "FIX",
   "side": "ALLY",
   "src": "nhUeSwko.jpg",
   "rule": "Negotiates peace, restores 5 power to hero."
 },
 {
   "id": "c043",
   "name": "Bonan Hedwinder",
   "power": 8,
   "maxPower": 8,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "FIX",
   "side": "ALLY",
   "src": "A0CFzYYl.jpg",
   "rule": ""
 },
 {
   "id": "c044",
   "name": "Dr. Frwhuwhincs",
   "power": 6,
   "maxPower": 6,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "FIX",
   "side": "ALLY",
   "src": "WLqQLKko.jpg",
   "rule": ""
 },
 {
   "id": "c045",
   "name": "Yengon",
   "power": 10,
   "maxPower": 10,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "FIX",
   "side": "ALLY",
   "src": "T0hjNO4T.jpg",
   "rule": ""
 },
 {
   "id": "c046",
   "name": "Infection",
   "power": 2,
   "maxPower": 2,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "FIX",
   "side": "ALLY",
   "src": "Yro6PisJ.jpg",
   "rule": ""
 },
 {
   "id": "c047",
   "name": "Brew Generator",
   "power": 3,
   "maxPower": 3,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "WORTH",
   "side": "NEUTRAL",
   "src": "c2gP3sFA.jpg",
   "rule": ""
 },
 {
   "id": "c048",
   "name": "Plasma Converter",
   "power": 5,
   "maxPower": 5,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "GADGET",
   "work": "WORTH",
   "side": "NEUTRAL",
   "src": "W5Th7Jy0.jpg",
   "rule": ""
 },
 {
   "id": "c048",
   "name": "Proton Palace",
   "power": 6,
   "maxPower": 6,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "LOCATION",
   "work": "WORTH",
   "side": "NEUTRAL",
   "src": "BowtpsXL.jpg",
   "rule": ""
 },
 {
   "id": "c049",
   "name": "Xeno Princess",
   "power": 9,
   "maxPower": 9,
   "actionSlot": 0,
   "storeSlot": 0,
   "type": "ALIEN",
   "work": "WORTH",
   "side": "NEUTRAL",
   "src": "8WYRIC4b.jpg",
   "rule": ""
 },
 {
   "id": "c050",
   "name": "Holy Sparrow",
   "power": 10,
   "maxPower": 10,
   "actionSlot": 1,
   "storeSlot": 0,
   "type": "SPACE-SHIP",
   "work": "WORTH",
   "side": "ALLY",
   "src": "pJ8BcvCg.jpg",
   "rule": ""
 }
];