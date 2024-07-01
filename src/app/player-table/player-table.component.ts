import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
    selector: 'app-player-table',
    standalone: true,
    templateUrl: './player-table.component.html',
    styleUrl: './player-table.component.css',
    imports: []
})
export class PlayerTableComponent implements AfterViewInit {
  @Input() players: Player[] = [];
  @ViewChild("my_modal_1") toggle: ElementRef | undefined;

  ngAfterViewInit(): void {
    console.log(this.toggle);
  }

  openModal() {
    this.toggle?.nativeElement.showModal();
  }
}
