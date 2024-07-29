import { Component, Input } from '@angular/core';
import { Team } from '../models/team.model';
import { DraftManagerService } from '../draft-manager.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() teams: Team[] = [];


  constructor(public draftManagerService: DraftManagerService) {}

  getCurrentTeam(): string | null {
    return this.draftManagerService.getTeamOnClock() ?? '';
  }

  isLastTeam(index: number): boolean {
    return index === this.teams.length - 1;
  }
}
