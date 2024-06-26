import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map, toArray } from 'rxjs';
import { Player } from '../models/player.model';


@Component({
  selector: 'app-draft-page',
  standalone: true,
  imports: [],
  templateUrl: './draft-page.component.html',
  styleUrl: './draft-page.component.css'
})
export class DraftPageComponent implements OnInit {

  teams: Team[] = [];
  allPlayers: Player[] = [];

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.teams = this.apiService.getItem('teams');
    console.log(this.teams);

    const url: string = '/assets/FantasyPros_2024_Draft_ALL_Ranking.json';
    this.http.get<any[]>(url).subscribe((response) => {
      this.allPlayers = [...response];
      console.log(this.allPlayers);
    });
  }

}
