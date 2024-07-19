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

  currentRound = 1;
  currentPickIndex = 0;
  isReverse = false;
  currentTeam = this.teams[0];


  constructor(public draftManagerService: DraftManagerService) {}

  getCurrentTeam(): string | null {
    return this.teams[this.currentPickIndex].name;
  }

  nextPick() {
    if (this.isReverse) {
      this.currentPickIndex--;
      if (this.currentPickIndex < 0) {
        this.currentPickIndex = 0;
        this.isReverse = false;
        this.currentRound++;
      }
    } else {
      this.currentPickIndex++;
      if (this.currentPickIndex >= this.teams.length) {
        this.currentPickIndex = this.teams.length - 1;
        this.isReverse = true;
        this.currentRound++;
      }
    }
  }

  makePick() {
    console.log(
      `Round ${this.currentRound}, Pick ${
        this.currentPickIndex + 1
      }: ${this.getCurrentTeam()} is on the clock`
    );
    this.nextPick();
  }

  isLastTeam(index: number): boolean {
    return index === this.teams.length - 1;
  }
}
