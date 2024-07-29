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
import { DraftManagerService } from '../draft-manager.service';

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
  teamsForm: FormGroup | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private draftManagerService: DraftManagerService,
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
  }

  startDraft() {
    // Map form controls to Team interface
    let teamIDCounter = 1; // Future Zach this will be assigned by the database
    const teams: Team[] = this.teamsFormArray.controls.map((formGroup) => {
      // For some reason formGroup is not the type of FormGroup<TeamsForm>?
      const teamFormGroup: FormGroup<TeamsForm> = formGroup as FormGroup<TeamsForm>;

      const team: Team = {
        id: teamIDCounter++,
        name: teamFormGroup.controls.nameCtrl.value,
        belongsToCurrentUser: teamFormGroup.controls.belongsToCurrentUser.value ?? false,
        players: []
      }

      return team
    });

    this.draftManagerService.initializeDraft$({
      teams: teams, 
      draftOrder: teams.map(t => ({teamID: t.id , teamName: t.name})) // The order is set by the user in the form
    }).subscribe((draftIsInitialized) => {
      // Navigate to draft page on successfull draft initialization (TODO: handle error case)
      if (draftIsInitialized) {
        this.router.navigate(["draft"]);
      }
    });
  }
}
