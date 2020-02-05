import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, throwError, of } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom, filter } from 'rxjs/operators';
import { TicketService } from '../services/ticket.service';
import * as ticketActions from './ticket.actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ISupportTicket } from '../interfaces/ticket';
import { IError, ILoader } from './ticket.reducer';
import { Router } from '@angular/router';

@Injectable()
export class TicketEffects {

  constructor(
    private store: Store<{tickets: ISupportTicket[], errors: IError, loader: ILoader}>,
    private actions$: Actions,
    private ticketService: TicketService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_GETALL),
    mergeMap(() => this.ticketService.all()
      .pipe(
        map(tickets => {
          this.store.dispatch(ticketActions.done())
          return ticketActions.getAllSuccess({ tickets });
        }),
        catchError(() => of(ticketActions.getAllFailure({ error: 'Unable to load support tickets' })))
      ))
    )
  );

  createTicket$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_CREATE),
    mergeMap(({ payload }) => this.ticketService.create(payload)
      .pipe(
        map(ticket => {
          this.store.dispatch(ticketActions.done());
          this.toastr.success('Ticket successfully created', 'Success');
          return ticketActions.createTicketSuccess({ ticket });
        }),
        catchError(() => {
          this.toastr.error('Unable to create ticket', 'Operation Failed');
          return EMPTY;
        })
      ))
    )
  );

  updateTicket$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_UPDATE),
    mergeMap(({ id, payload }) => this.ticketService.update(id, payload)
      .pipe(
        map(ticket => {
          this.store.dispatch(ticketActions.done());
          this.toastr.success('Ticket successfully updated!', 'Success');
          return ticketActions.updateSuccess({ ticket });
        }),
        catchError(() => {
          this.toastr.error('Unable to update ticket', 'Operation Failed');
          return EMPTY;
        })
      ))
    )
  );

  deleteTicket$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_DELETE),
    mergeMap(({ id }) => this.ticketService.delete(id)
      .pipe(
        map(ticket => {
          this.store.dispatch(ticketActions.done());
          this.toastr.success('Ticket successfully deleted!', 'Success');
          return ticketActions.deleteTicketSuccess({ id: ticket.id });
        }),
        catchError(() => {
          this.toastr.error('Unable to delete ticket', 'Operation Failed');
          return EMPTY;
        })
      ))
    )
  );

  search$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.SEARCH),
    withLatestFrom(this.store),
    map((payload) => {
      const search: { searchStr: string, type: string } = payload[0];
      const state = payload[1];
      let filtered = [];
      
      if (search.searchStr.length) {
        filtered = state.tickets.filter(ticket => {
          const isInDescription = ticket.description.toLowerCase().indexOf(search.searchStr) > -1;
          const isInTitle = ticket.title.toLowerCase().indexOf(search.searchStr) > -1;

          return isInTitle || isInDescription;
        });
      }

      return ticketActions.doSearch({ searchResult: [...filtered] });
    })
  ));
}
