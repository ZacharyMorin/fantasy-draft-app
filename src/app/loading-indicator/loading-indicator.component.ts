import { Component } from '@angular/core';


@Component({
  selector: 'app-loading-indicator',
  template: `
    <span class="loading loading-dots loading-lg">
    </span>
  `,
  styleUrls: ['./loading-indicator.component.css'],
  standalone: true
})
export class LoadingIndicatorComponent  {

  constructor() {}

}
