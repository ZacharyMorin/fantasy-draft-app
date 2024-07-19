import { Injectable } from '@angular/core';
import { Draft } from './models/draft.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Player } from './models/player.model';
import { Observable } from 'rxjs';
import { Team } from './models/team.model';

@Injectable({
  providedIn: 'root'
})
export class DraftManagerService {
  private draft: Draft | null = null;
  private playerCsvUrl = '/assets/FantasyPros_2024_Draft_ALL_Ranking.json';
  public allPlayers: Player[] = []; 
  public teams: Team[] = [];

  public currentRound = 1;
  public currentPickIndex = 0;
  public isReverse = false;
  public currentTeam = this.teams[0];

  constructor(private http: HttpClient, private apiService: ApiService) { }


  /**
   * Returns an Observable which emits true when the draft has been successfully initialized.
   */
  public initializeDraft$(_draft: Draft) {
    return new Observable<boolean>((sub) => {
      // Get the list of all players for the draft
      this.http.get<any[]>(this.playerCsvUrl).subscribe(response => {
        this.draft = _draft;
        this.allPlayers = [...response];
        this.apiService.setItem('teams', this.draft.teams);
        this.teams = this.draft.teams;

        sub.next(true);
        sub.complete();
      });
    })
  }

  /**
   * 
   * @returns The team name this is currently making a draft pick
   */
  public getTeamOnClock(): string | null {
    return this.teams[this.currentPickIndex].name;
  }


  public nextPick() {
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

  public makePick() {
    this.nextPick();
  }

  public isLastTeam(index: number): boolean {
    return index === this.teams.length - 1;
  }


  public assignPlayerToTeam(player: Player) {


  }


}