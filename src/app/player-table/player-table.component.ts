import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css'
})
export class PlayerTableComponent {
  @Input() players: Player[] = [];
  
}
