import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ticketActions from '../../store/ticket.actions';
import * as ticketReducer from '../../store/ticket.reducer';
import { Observable, of } from 'rxjs';
import { ISupportTicket } from 'src/app/interfaces/ticket';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tickets$: Observable<ISupportTicket[]>;

  constructor(private store: Store<{tickets: ticketReducer.ITicket, loader: any}>) {}

  ngOnInit() {
    this.tickets$ = this.store.pipe(select('tickets'));
    this.store.dispatch(ticketActions.getAll());
  }
}
