import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import * as ticketActions from '../../../store/ticket.actions';
import { IError, ILoader } from 'src/app/store/ticket.reducer';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { formMode as Mode } from 'src/app/interfaces/forms';

interface State {
  tickets: ISupportTicket[],
  errors: IError,
  loader: ILoader,
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  title = 'Support Tickets';
  formMode = Mode;
  loader$ = this.store.pipe(select('loader'));
  errors$ = this.store.pipe(select('errors'));
  private searchFilterSubject = new BehaviorSubject<string>('');
  tickets$ = this.getFilteredTickets();

  constructor(private store: Store<State>) {
    this.loadTickets();
  }

  getFilteredTickets() {
    return combineLatest([
        this.store.pipe(select('tickets')),
        this.searchFilterSubject.asObservable()
      ])
      .pipe(
        map(([tickets, str]) => {
          if (str.length) {
            return tickets.filter(ticket => {
              const isInDescription = ticket.description.toLowerCase().indexOf(str) > -1;
              const isInTitle = ticket.title.toLowerCase().indexOf(str) > -1;
      
              return isInTitle || isInDescription;
            });
          }
          return tickets;
        })
      );
  }

  loadTickets() {
    this.store.dispatch(ticketActions.loading());
    this.store.dispatch(ticketActions.getAll());
  }

  deleteTicket(event, id: number) {
    this.store.dispatch(ticketActions.deleting());
    this.store.dispatch(ticketActions.deleteTicket({ id: +id }));
  }

  search(searchStr: string) {
    this.searchFilterSubject.next(searchStr.trim());
  }
}
