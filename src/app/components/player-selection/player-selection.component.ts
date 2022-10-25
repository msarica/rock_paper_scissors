import { Component, OnInit } from '@angular/core';
import { GameChangeAction, Player } from 'src/models/models';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.css']
})
export class PlayerSelectionComponent implements OnInit {

  players: { [key: number]: Player } = {
    // 1: {
    //   name: 'mehmet',
    //   isComputer: false
    // },
    // 2: {
    //   name: 'Computer',
    //   isComputer: false
    // }
  };

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  playerReady(player: Player, playerNo: number) {
    // console.log(playerNo, player)
    this.players[playerNo] = player;
  }

  get canStart() {
    return this.players && this.players[1] && this.players[2];
  }

  startGame() {
    console.log('starting')
    this.gameService.sendEvent({
      action: GameChangeAction.GameStarted,
      data: Object.values(this.players)
    })
  }
}
