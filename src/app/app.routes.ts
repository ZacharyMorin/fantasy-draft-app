import { Routes } from '@angular/router';
import { DraftSetUpPageComponent } from './draft-set-up-page/draft-set-up-page.component';
import { DraftPageComponent } from './draft-page/draft-page.component';

export const routes: Routes = [
  { path: 'league-set-up', component: DraftSetUpPageComponent },
  { path: 'draft', component: DraftPageComponent },
];
