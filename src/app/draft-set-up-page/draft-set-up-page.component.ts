import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Team } from '../models/team.model';
import { LoadingService } from '../loading-indicator/loading.service';
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";

const DEFAULT_NUMBER_OF_TEAMS: number = 12;

@Component({
    selector: 'app-draft-set-up-page',
    standalone: true,
    templateUrl: './draft-set-up-page.component.html',
    styleUrl: './draft-set-up-page.component.css',
    imports: [ReactiveFormsModule, CommonModule, LoadingIndicatorComponent]
})
export class DraftSetUpPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  numOfTeamsCtrl: FormControl<number | null> = new FormControl(
    DEFAULT_NUMBER_OF_TEAMS
  );

  teamsFormArray = new FormArray<FormControl<string>>([]);
  teamsForm = new FormGroup({
    teams: this.teamsFormArray,
  });

  constructor(
    private router: Router,
    private apiService: ApiService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.updateTeamsForm(DEFAULT_NUMBER_OF_TEAMS);

    this.numOfTeamsCtrl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((numOfTeams) => {
        console.log('numOfTeams', numOfTeams);
        this.updateTeamsForm(numOfTeams);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get canStartDraft(): boolean {
    return (
      this.teamsFormArray &&
      this.teamsFormArray.controls.every((control) => control.value)
    );
  }

  updateTeamsForm(numOfTeams: number | null): void {
    if (numOfTeams === null || numOfTeams === undefined || numOfTeams === 0) {
      this.teamsFormArray.clear();
      return;
    }

    const currentLength = this.teamsFormArray.length;

    if (numOfTeams > currentLength) {
      for (let i = currentLength; i < numOfTeams; i++) {
        this.teamsFormArray.push(new FormControl());
      }
      return;
    }

    for (let i = currentLength; i > numOfTeams; i--) {
      this.teamsFormArray.removeAt(i - 1);
    }
  }

  startDraft() {
    this.loadingService.setLoading(true);

    // TODO Zach: Remove setTimeout, this is just a mock to test the loading indicator
    setTimeout(() => {
      // Map form controls to Team interface for API call
      const teams: Team[] = this.teamsFormArray.controls.map(ctrl => {
        const team: Team = {
          id: null,
          name: ctrl.value,
          players: []
        }

        return team
      });

      // Save team names and navigate to draft page after a successful api call
      this.apiService.setItem('teams', teams);
      this.router.navigate(["draft"]).then(() => {
        this.loadingService.setLoading(true);
      });
    }, 5000)
  }
}
