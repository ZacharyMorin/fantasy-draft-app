import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player.model';
import { PlayerCardComponent } from "../player-card/player-card.component";
import { PlayerTableComponent } from "../player-table/player-table.component";
import { CommonModule } from '@angular/common';


export enum Tab {
  All = 'All',
  QB = 'QB',
  RB = 'RB',
  WR = 'WR',
  TE = 'TE'
}


@Component({
    selector: 'app-draft-page',
    standalone: true,
    templateUrl: './draft-page.component.html',
    styleUrl: './draft-page.component.css',
    imports: [PlayerCardComponent, PlayerTableComponent, CommonModule]
})
export class DraftPageComponent implements OnInit {
  selectedTab: Tab = Tab.All;

  teams: Team[] = [];
  allPlayers: Player[] = [];

  tabs = Tab; // Reference the Enum to use in the template


  constructor(private apiService: ApiService, private http: HttpClient) {}


  ngOnInit(): void {
    this.teams = this.apiService.getItem('teams');
    console.log(this.teams);

    const url: string = '/assets/FantasyPros_2024_Draft_ALL_Ranking.json';
    this.http.get<any[]>(url).subscribe((response) => {
      this.allPlayers = [...response];
    });
  }


  playersByPosition(position: string): Player[] {
    return this.allPlayers.filter(player => player.POS.startsWith(position));
  }

  selectTab(tab: Tab): void {
    this.selectedTab = tab;
  }
}
