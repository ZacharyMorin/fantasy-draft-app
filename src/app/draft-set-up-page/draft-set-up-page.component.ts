import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-draft-set-up-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './draft-set-up-page.component.html',
  styleUrl: './draft-set-up-page.component.css'
})
export class DraftSetUpPageComponent implements OnInit {
  numOfTeamsCtrl: FormControl<number | null> = new FormControl(null);
  teams: Team[] = [];

  constructor() {}


  ngOnInit(): void {
    // TODO: Unsubscribe
    this.numOfTeamsCtrl.valueChanges.subscribe((numOfTeams) => {
      // populate Team array
    })
  }
}
