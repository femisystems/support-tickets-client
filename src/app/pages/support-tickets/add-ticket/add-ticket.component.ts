import { Component, OnInit } from '@angular/core';
import { formMode } from 'src/app/interfaces/forms';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  readonly formMode = formMode.CREATE;
  title = 'Create New Support Ticket';
  constructor() { }

  ngOnInit() {
  }
}
