import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Player } from '../models/player.model';
import { CommonModule } from '@angular/common';
import { DraftManagerService } from '../draft-manager.service';

@Component({
  selector: 'app-player-table',
  standalone: true,
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css',
  imports: [CommonModule]
})
export class PlayerTableComponent {
  @Input() players: Player[] = [];
  @ViewChild("my_modal_1") toggle: ElementRef | undefined;


  constructor(private draftManagerService: DraftManagerService) {

  }

  selectedPlayer: any;

  openModal(player: any) {
    this.selectedPlayer = player;
    this.toggle?.nativeElement.showModal();
  }

  draftPlayer(player: Player) {
    this.draftManagerService.assignPlayerToTeam(player);
    this.toggle?.nativeElement.close();
  }

  getPlayerBackgroundColor(player: Player): string {
    if (player.ASSIGNED_TEAM_ID === null) {
      return 'bg-white'; // Unselected players
    } else if (this.draftManagerService.currentPickBelongsToUser) {
      return 'bg-green-500'; // Assigned to current user's team
    } else {
      return 'bg-red-500'; // Assigned to another team
    }
  }
}
