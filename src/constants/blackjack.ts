export const DEFAULT_VALUE_BET = 0.01;
export const DEALER_NUMBER = 16;
export const DEALER_PRIV_NUMBER = 2;
export const PLAYER_NUMBER = 64;
export const PLAYER_PRIV_NUMBER = 3;
// state:
// 1: stared
// 2: dealer shulled
// 3: user shuffled
// 4: user deal 4
// 5: dealer deal 3
// 6: user Hit
// 7: dealer deal hit
// 8: user double
// 9: user stand
// 10: dealer hit
// 11: user blackjack stop game
// 12: user bust stop game
// 13: push
// 14: user win
// 15: dealer blackjack
// 16: dealer win
// 17: dealer bust

export const GAME_STATES = {
  DEALER_STARTED: 1,
  DEALER_SHUFFLED: 2,
  PLAYER_JOIN_AND_SHUFFLE: 3,
  PLAYER_DEAL4: 4,
  DEALER_DEAL3: 5,
  PLAYER_HITTING: 6,
  DEALER_DEAL_HIT: 7,
  PLAYER_DOUBLE: 8,
  PLAYER_STAND: 9,
  DEALER_DEAL_HIDDEN_CARD: 20, //fixme
  DEALER_HIT: 10,
  PLAYER_BLACKJACK: 11,
  PLAYER_BURST: 12,
  PUSH_GAME: 13,
  PLAYER_WIN: 14,
  DEAL_BLACKJACK: 15,
  DEAL_WIN: 16,
  DEAL_BURST: 17,
};

export const GAME_STATES_TITLE: Record<
  typeof GAME_STATES[keyof typeof GAME_STATES],
  string
> = {
  [GAME_STATES.DEALER_STARTED]: 'Dealer shuffle',
  [GAME_STATES.DEALER_SHUFFLED]: 'Waiting player join',
  [GAME_STATES.PLAYER_JOIN_AND_SHUFFLE]: 'Waiting player deal',
  [GAME_STATES.PLAYER_DEAL4]: 'Waiting dealer approve',
  [GAME_STATES.DEALER_DEAL3]: 'Player hit card or stand',
  [GAME_STATES.PLAYER_HITTING]: 'Waiting dealer approve',
  [GAME_STATES.DEALER_DEAL_HIT]: 'Player hit card, double or stand',
  [GAME_STATES.PLAYER_DOUBLE]: 'Waiting dealer approve',
  [GAME_STATES.PLAYER_STAND]: 'Dealer open hidden card',
  [GAME_STATES.DEALER_DEAL_HIDDEN_CARD]: 'Dealer hit card',
  [GAME_STATES.DEALER_HIT]: 'Dealer hit card',
  [GAME_STATES.PLAYER_BLACKJACK]: 'Blackjack for Player',
  [GAME_STATES.PLAYER_BURST]: 'Dealer Win',
  [GAME_STATES.PUSH_GAME]: 'Push Game',
  [GAME_STATES.PLAYER_WIN]: 'Player Win',
  [GAME_STATES.DEAL_BLACKJACK]: 'Blackjack for Dealer',
  [GAME_STATES.DEAL_WIN]: 'Dealer Win',
  [GAME_STATES.DEAL_BURST]: 'Player Win',
};

export const STATE_FOR_NEXT_PLAYER_ACTIONS = [
  GAME_STATES.DEALER_SHUFFLED,
  GAME_STATES.PLAYER_JOIN_AND_SHUFFLE,
  GAME_STATES.DEALER_DEAL3,
  GAME_STATES.DEALER_DEAL_HIT,
];
export const STATE_FOR_NEXT_DEALER_ACTIONS = [
  GAME_STATES.DEALER_STARTED,
  GAME_STATES.PLAYER_DEAL4,
  GAME_STATES.PLAYER_HITTING,
  GAME_STATES.PLAYER_DOUBLE,
  GAME_STATES.PLAYER_STAND,
  GAME_STATES.DEALER_DEAL_HIDDEN_CARD,
  GAME_STATES.DEALER_HIT,
];
export const STATE_FOR_END_GAME = [
  GAME_STATES.PLAYER_BLACKJACK,
  GAME_STATES.PLAYER_BURST,
  GAME_STATES.PUSH_GAME,
  GAME_STATES.PLAYER_WIN,
  GAME_STATES.DEAL_BLACKJACK,
  GAME_STATES.DEAL_WIN,
  GAME_STATES.DEAL_BURST,
];
