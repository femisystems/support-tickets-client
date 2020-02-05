import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { formMode } from 'src/app/interfaces/forms';
import { ISupportTicket, StatusType, PriorityType } from 'src/app/interfaces/ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  readonly formMode = formMode.EDIT;
  title = 'Ticket Detail';
  isPreviewMode: boolean = true;
  ticket$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ticket$ = data.ticket
    });
  }

  transform(ticket: ISupportTicket): any {
    const transformed = {};

    for (let key in ticket) {
      if (key === 'status') transformed[key] = StatusType[ticket[key]].toLowerCase();
      if (key === 'priority') transformed[key] = PriorityType[ticket[key]].toLowerCase();
      if (!transformed[key]) transformed[key] = ticket[key];
    }
    return transformed;
  }

  goBack(delay: number) {
    setTimeout(() => {
      this.router.navigate(['/support-tickets']);
    }, delay);
  }
}
