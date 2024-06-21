import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormArray,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Team } from '../models/team.model';
import { LoadingService } from '../loading-indicator/loading.service';
import { LoadingIndicatorComponent } from "../loading-indicator/loading-indicator.component";

const DEFAULT_NUMBER_OF_TEAMS: number = 12;

export interface TeamsForm {
  nameCtrl: FormControl<string | null>;
  belongsToCurrentUser: FormControl<boolean | null>;
}

@Component({
    selector: 'app-draft-set-up-page',
    standalone: true,
    templateUrl: './draft-set-up-page.component.html',
    styleUrl: './draft-set-up-page.component.css',
    imports: [ReactiveFormsModule, CommonModule, LoadingIndicatorComponent]
})
export class DraftSetUpPageComponent implements OnInit, OnDestroy {
  selectedDraftPosition: number | null = null;
  numOfTeamsCtrl: FormControl<number | null> = new FormControl(DEFAULT_NUMBER_OF_TEAMS);
  // teamsFormArray = new FormArray<FormGroup<TeamsForm>>([]);
  teamsForm: FormGroup | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private apiService: ApiService,
    public loadingService: LoadingService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.teamsForm = this.fb.group({
      teams: this.fb.array<TeamsForm>([])
    });


    this.updateTeamsForm(DEFAULT_NUMBER_OF_TEAMS);

    this.numOfTeamsCtrl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((numOfTeams) => {
        console.log('numOfTeams', numOfTeams);
        this.updateTeamsForm(numOfTeams);
      });
  }

  get teamsFormArray(): FormArray {
    return this.teamsForm?.get('teams') as FormArray;
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

    const currentTeamsFormArrayLength = this.teamsFormArray.length;

    const leagueMembers: string[] = ['Zach', 'Justin', 'Kevin', 'Andrew', 'Kenny', 'AJ', 'Miles', 'Fish', 'Bozek', 'Connor', 'Jarrett', 'Mikey']

    if (numOfTeams > currentTeamsFormArrayLength) {
      for (let i = currentTeamsFormArrayLength; i < numOfTeams; i++) {
        this.teamsFormArray.push(this.fb.group({
          nameCtrl: new FormControl<string | null>(leagueMembers[i]),
          belongsToCurrentUser: new FormControl<boolean | null>(false)
        }) as FormGroup<TeamsForm>)
      }

      return;
    }

    for (let i = currentTeamsFormArrayLength; i > numOfTeams; i--) {
      this.teamsFormArray.removeAt(i - 1);
    }
  }

  selectTeam(index: number): void {
    this.selectedDraftPosition = index;
    this.teamsFormArray.controls[index].patchValue({belongsToCurrentUser: true});

    console.log(this.teamsFormArray.controls);
  }

  startDraft() {
    this.loadingService.setLoading(true);

    // TODO Zach: Remove setTimeout, this is just a mock to test the loading indicator
    setTimeout(() => {
      // Map form controls to Team interface for API call
      const teams: Team[] = this.teamsFormArray.controls.map((group) => {
        const teamFormGroup: FormGroup<TeamsForm> = group as FormGroup<TeamsForm>;

        const team: Team = {
          id: null,
          name: teamFormGroup.controls.nameCtrl.value,
          belongsToCurrentUser: teamFormGroup.controls.belongsToCurrentUser.value ?? false,
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
