import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ticketActions from '../../store/ticket.actions';
import * as ticketReducer from '../../store/ticket.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tickets$ = this.store.pipe(select('tickets'));

  constructor(private store: Store<{tickets: ticketReducer.ITicket, loader: any}>) {
    this.store.dispatch(ticketActions.getAll());
  }
}
