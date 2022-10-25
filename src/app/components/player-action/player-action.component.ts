import { Component, Input, OnInit } from '@angular/core';
import { GameAction, GameChangeAction, Player } from 'src/models/models';
import { GameService } from '../../../services/game.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player-action',
  templateUrl: './player-action.component.html',
  styleUrls: ['./player-action.component.css']
})
export class PlayerActionComponent implements OnInit {

  selectionNeeded = true;

  @Input()
  player: Player;

  $destroy = new Subject();

  readonly actions: GameAction[] = ['rock', 'paper', 'scissors']
  // selection: GameAction;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.newRound();

    this.gameService.gameEvents()
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe(s => {
        switch (s.action) {
          case GameChangeAction.NewRound:
            this.newRound();
            break;

        }
      });
  }

  newRound() {
    this.selectionNeeded = true;

    if (this.player.isComputer) {
      this.randomlySelect();
    }
  }

  select(action: GameAction) {
    this.selectionNeeded = false;

    this.gameService.sendEvent({
      action: GameChangeAction.PlayerActionSelected,
      data: {
        player: this.player,
        action
      }
    })
  }

  randomlySelect() {
    const action = this.actions[Math.floor(Math.random() * this.actions.length)];
    this.select(action);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }
}
