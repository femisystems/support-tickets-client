import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, interval } from 'rxjs';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import { throttle, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as ticketActions from '../../../store/ticket.actions';
import { IError, ILoader, ISearchResult } from 'src/app/store/ticket.reducer';

interface State {
  tickets: ISupportTicket[],
  errors: IError,
  loader: ILoader,
  searchResult: ISearchResult
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  title = 'Support Tickets';
  
  tickets$: Observable<ISupportTicket[]>;
  errors$: Observable<IError>;
  searchResult$: Observable<ISearchResult>;
  loader$: Observable<ILoader>;

  constructor(
    private router: Router,
    private store: Store<State>
  ) {}

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

  goto(ticketId: string, isEditMode: boolean = false) {
    let url = '/support-tickets';

    if (isEditMode) {
      url = `${url}/${ticketId}`;
      this.router.navigate([url, { queryParams: { mode: 'edit' }}]);
    } else {
      this.router.navigate([url, ticketId]);
    }
  }

  deleteTicket(event, id: number) {
    this.store.dispatch(ticketActions.deleting())
    this.store.dispatch(ticketActions.deleteTicket({ id }));
  }

  search(searchStr: string) {
    this.store.dispatch(ticketActions.search({ searchStr }));
  }

  dismiss(event) { return }
}
