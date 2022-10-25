export interface Player {
  name: string;
  isComputer?: boolean;
  score?: number;
}

export enum GameChangeAction {
  GameStarted,
  NewRound,
  PlayerActionSelected,
  // PlayerScored,
  ScoreUpdated
}

export interface GameChanges<T = any> {
  action: GameChangeAction,
  data?: T
}

export type GameAction = 'rock' | 'paper' | 'scissors';

export interface PlayerAction {
  player: Player,
  action: GameAction
}
