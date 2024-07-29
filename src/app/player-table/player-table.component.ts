import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-table',
  standalone: true,
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css',
  imports: []
})
export class PlayerTableComponent {
  @Input() players: Player[] = [];
  @ViewChild("my_modal_1") toggle: ElementRef | undefined;
  @Output() draftedPlayer: EventEmitter<Player> = new EventEmitter();

  selectedPlayer: any;

  openModal(player: any) {
    this.selectedPlayer = player;
    this.toggle?.nativeElement.showModal();
  }

  draftPlayer(player: Player) {
    this.draftedPlayer.emit(player);
    this.toggle?.nativeElement.close();
  }
}
