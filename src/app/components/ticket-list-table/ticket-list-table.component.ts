import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import { formMode as Mode } from 'src/app/interfaces/forms';

@Component({
  selector: 'app-ticket-list-table',
  templateUrl: './ticket-list-table.component.html',
  styleUrls: ['./ticket-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListTableComponent implements OnInit {
  @Input() ticketList: ISupportTicket[] = [];
  @Input() deletingTicket: number;
  @Output() deleteTicket: EventEmitter<{ id: number }> = new EventEmitter();
  formMode = Mode;
  
  constructor() { }

  ngOnInit() {
  }

  removeTicket(event, id: number) {
    this.deleteTicket.emit({ id });
  }
}
