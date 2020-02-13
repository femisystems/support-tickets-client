import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class TicketListComponent implements OnInit {
  title = 'Support Tickets';
  tickets$: Observable<ISupportTicket[]>;
  errors$: Observable<IError>;
  searchResult$: Observable<ISearchResult>;
  loader$: Observable<ILoader>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.loader$ = this.store.pipe(select('loader'));
    this.tickets$ = this.store.pipe(select('tickets'));
    this.errors$ = this.store.pipe(select('errors'));
    this.searchResult$ = this.store.pipe(select('searchResult'));
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

  search(searchStr: string) {
    this.store.dispatch(ticketActions.search({ searchStr }));
  }
}
