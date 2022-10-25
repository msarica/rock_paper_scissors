import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameChangeAction, GameChanges, Player, PlayerAction } from '../models/models';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly SAVE_GAME_KEY = 'saved_game';
  private $gameEvents = new BehaviorSubject<GameChanges>(null);

  private playerSelections: {
    [key: string]: PlayerAction
  } = {};

  private players: Player[]

  constructor(
    private infoService: InfoService
  ) {
    this.subscriptions();
  }

  private getSavedItem() {
    return localStorage.getItem(this.SAVE_GAME_KEY);
  }

  hasSavedGame() {
    return !!this.getSavedItem();
  }

  continue() {
    const str = this.getSavedItem();
    const players = JSON.parse(str);

    this.sendEvent({
      action: GameChangeAction.GameStarted,
      data: players
    })
  }

  saveGame() {
    // todo
    localStorage.setItem(this.SAVE_GAME_KEY, JSON.stringify(this.players));
    this.infoService.notify('game saved');
  }

  gameEvents() {
    return this.$gameEvents
      .asObservable()
      .pipe(
        filter(i => !!i)
      )
      ;
  }

  subscriptions() {
    this
      .gameEvents()
      .subscribe(ev => {
        switch (ev.action) {
          case GameChangeAction.GameStarted:
            this.newGame(ev.data);
            break;
          case GameChangeAction.NewRound:
            this.playerSelections = {};
            break;
          case GameChangeAction.PlayerActionSelected:
            this.playerSelectedAction(ev.data);
            break;
        }
      })
  }

  private newGame(players: Player[]) {
    this.players = players.map(i => ({
      score: 0,
      ...i
    }));

    this.sendEvent({
      action: GameChangeAction.ScoreUpdated,
      data: this.players
    })
  }

  private playerSelectedAction(data: PlayerAction) {
    this.playerSelections[
      data.player.name
    ] = data;

    if (Object.keys(this.playerSelections).length === 2)
      this.declareWinner();
  }

  private getActionsText() {
    return Object.values(this.playerSelections).map(i => `${i.player.name}: ${i.action}`).join(' - ');
  }

  private declareWinner() {

    const player = this.whoWon();
    // console.log(player)

    if (player) {
      const playerActions = this.getActionsText();
      this.infoService.notify(`${playerActions} || ${player.name} wins `);

      player.score++;

      this.sendEvent({
        action: GameChangeAction.ScoreUpdated,
        data: this.players
      });
    } else {
      this.infoService.notify('Tie');
    }
    this.sendEvent({
      action: GameChangeAction.NewRound
    });

  }

  private whoWon(): Player {
    // console.log(this.playerSelections)
    const p1data = this.playerSelections[this.players[0].name];
    const p2data = this.playerSelections[this.players[1].name];

    if (p1data.action === p2data.action) return null;

    const key = `${p1data.action}_${p2data.action}`;
    const p1Wins = {
      'rock_scissors': true,
      'paper_rock': true,
      'scissors_paper': true
    };

    return p1Wins[key] ? this.players[0] : this.players[1];
  }

  sendEvent(ev: GameChanges) {
    this.$gameEvents.next(ev);
  }
}
