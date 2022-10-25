import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { GameComponent } from './components/game/game.component';
import { PlayerSelectionComponent } from './components/player-selection/player-selection.component';
import { FormsModule } from '@angular/forms';
import { PlayerActionComponent } from './components/player-action/player-action.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ScoreboardComponent,
    GameComponent,
    PlayerSelectionComponent,
    PlayerActionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
