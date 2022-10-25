import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../../models/models';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlayerComponent implements OnInit {

  @Input()
  player: Player;

  @Input()
  canBeComputer = true;

  @Output()
  onReady = new EventEmitter<Player>();

  isComputer: boolean;

  name: string = '';

  constructor(
    private infoService: InfoService
  ) { }

  ngOnInit(): void {
  }

  validate() {
    if (!this.isComputer && this.name.trim() == '') throw new Error('Name cannot be blank')
  }

  submit() {
    try {
      this.validate();

      this.player = {
        name: this.isComputer ? 'Computer' : this.name,
        isComputer: this.isComputer
      };

      this.onReady.emit(this.player);

    } catch (err) {
      this.infoService.error(err.message);
    }
  }
}
