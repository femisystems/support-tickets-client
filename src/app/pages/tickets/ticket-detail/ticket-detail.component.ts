import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { formMode as Mode } from 'src/app/interfaces/forms';
import { ISupportTicket, StatusType, PriorityType } from 'src/app/interfaces/ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  formMode: string;
  title = 'Ticket Detail';
  isPreviewMode: boolean = true;
  ticket$: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParamMap.subscribe(res => this.formMode = res.get('mode')),
      this.route.data.subscribe(data => this.ticket$ = data.ticket)
    )
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

  redirect(delay: number) {
    setTimeout(() => {
      this.router.navigate(['/tickets']);
    }, delay);
  }
}
