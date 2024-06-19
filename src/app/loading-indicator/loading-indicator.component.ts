import { Component } from '@angular/core';


@Component({
  selector: 'app-loading-indicator',
  template: `
    <span class="loading loading-spinner loading-lg"></span>
  `,
  standalone: true
})
export class LoadingIndicatorComponent  {

  constructor() {}

}
