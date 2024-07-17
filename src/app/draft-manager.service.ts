import { Injectable } from '@angular/core';
import { Draft } from './models/draft.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DraftManagerService {
  private draft: Draft | null = null;
  private playerCsvUrl = '/assets/FantasyPros_2024_Draft_ALL_Ranking.json';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  private setPlayerList() {
    this.http.get<any[]>(this.playerCsvUrl).subscribe((response) => {
      if (this.draft) {
        this.draft.players = [...response];
      }
    });
  }


  public setDraft(_draft: Draft) {
    this.draft = _draft;
    this.setPlayerList();
    this.apiService.setItem('teams', this.draft.teams);
  }


  public getTeams() {
    if (this.draft) {
      return this.draft.teams;
    }

    return [];
  }
}