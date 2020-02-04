import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-header',
  template: `
    <header class="app-header">
      <div (click)="toggleSidePanel.emit()">T</div> &nbsp;
      {{ title }}
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  title = 'SUPPORT TICKETS MANAGER';
  @Output() toggleSidePanel: EventEmitter<any>;

  constructor() {
    this.toggleSidePanel = new EventEmitter();
  }
}