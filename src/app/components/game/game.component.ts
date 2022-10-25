import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { GameChangeAction, Player } from 'src/models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  canContinue: boolean;
  $destroy = new Subject();
  mode: 'start' | 'playerSelection' | 'gamePlay' = 'start';

  players: Player[];


  constructor(
    private gameService: GameService
  ) { }


  ngOnInit(): void {
    this.canContinue = this.gameService.hasSavedGame();

    this.gameService.gameEvents()
      .pipe(
        takeUntil(this.$destroy)
      ).subscribe(ev => {
        switch (ev.action) {
          case GameChangeAction.GameStarted:
            this.gameStarted(ev.data);
            break;

          // case GameChangeAction.NewRound:

          // break;
        }
      });

  }

  gameStarted(players: Player[]) {

    this.mode = 'gamePlay';
    this.players = players;
  }

  newGame() {
    // this.gameService.newGame();
    this.mode = 'playerSelection';
  }

  continue() {
    this.gameService.continue();
  }

  saveGame() {
    this.gameService.saveGame();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }
}
