import { Component, OnInit } from '@angular/core';
import { GameChangeAction, GameChanges, Player } from '../../../models/models';
import { Subject } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  $destroy = new Subject();

  players: Player[];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    const $events = this.gameService.gameEvents()
      .pipe(
        takeUntil(this.$destroy)
      );

    $events.pipe(
      filter(i => i.action == GameChangeAction.ScoreUpdated)
    ).subscribe((d: GameChanges<Player[]>) => {
      this.players = d.data;
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }
}
