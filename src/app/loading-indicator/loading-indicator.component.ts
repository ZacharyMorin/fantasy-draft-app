import { Component } from '@angular/core';


@Component({
  selector: 'app-loading-indicator',
  template: `
    <span class="loading loading-spinner loading-lg"></span>
  `,
  styleUrls: ['./loading-indicator.component.css'],
  standalone: true
})
export class LoadingIndicatorComponent  {

  constructor() {}

}
