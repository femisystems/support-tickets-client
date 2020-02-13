import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import * as ticketActions from '../../../store/ticket.actions';
import { IError, ILoader, ISearchResult } from 'src/app/store/ticket.reducer';

interface State {
  tickets: ISupportTicket[],
  errors: IError,
  loader: ILoader,
  searchResult: ISearchResult
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  title = 'Support Tickets';
  searchResult$ = this.store.pipe(select('searchResult'));
  loader$ = this.store.pipe(select('loader'));
  tickets$ = this.store.pipe(select('tickets'));
  errors$ = this.store.pipe(select('errors'));
  searchStr = '';

  constructor(private store: Store<State>) {
    this.loadTickets();
  }

  loadTickets() {
    this.store.dispatch(ticketActions.loading());
    this.store.dispatch(ticketActions.getAll());
  }

  deleteTicket(event) {
    this.store.dispatch(ticketActions.deleting());
    this.store.dispatch(ticketActions.deleteTicket({ id: event.id }));
  }
}
