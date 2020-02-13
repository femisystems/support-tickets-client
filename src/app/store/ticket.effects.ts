import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TicketService } from '../services/ticket.service';
import * as ticketActions from './ticket.actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ISupportTicket } from '../interfaces/ticket';
import { IError, ILoader } from './ticket.reducer';

const { AppErrors } = ticketActions;

@Injectable()
export class TicketEffects {

  constructor(
    private store: Store<{tickets: ISupportTicket[], errors: IError, loader: ILoader}>,
    private actions$: Actions,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_GETALL),
    mergeMap(() => this.ticketService.all()
      .pipe(
        map(tickets => {
          this.store.dispatch(ticketActions.done())
          return ticketActions.getAllSuccess({ tickets });
        }),
        catchError(() => of(ticketActions.getAllFailure({ ctx: AppErrors.LOAD_ERROR, msg: 'Unable to load support tickets' })))
      ))
    )
  );

  createTicket$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_CREATE),
    mergeMap(({ payload }) => this.ticketService.create(payload)
      .pipe(
        map(ticket => {
          this.dispatchSuccess('Ticket successfully created!')
          return ticketActions.createTicketSuccess({ ticket });
        }),
        catchError(() => {
          this.toastr.error('Unable to create ticket', 'Operation Failed');
          return of(ticketActions.createTicketFailure({ ctx: AppErrors.CREATE_ERROR , msg: 'Unable to create tickets' }))
        })
      ))
    )
  );

  updateTicket$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_UPDATE),
    mergeMap(({ id, payload }) => this.ticketService.update(id, payload)
      .pipe(
        map(ticket => {
          this.dispatchSuccess('Ticket successfully updated!')
          return ticketActions.updateTicketSuccess({ ticket });
        }),
        catchError(() => {
          this.toastr.error('Unable to update ticket', 'Operation Failed');
          return of(ticketActions.updateTicketFailure({ ctx: AppErrors.UPDATE_ERROR , msg: 'Unable to update ticket' }))
        })
      ))
    )
  );

  deleteTicket$ = createEffect(() => this.actions$.pipe(
    ofType(ticketActions.TICKETS_DELETE),
    mergeMap(({ id }) => this.ticketService.delete(id)
      .pipe(
        map(ticket => {
          this.dispatchSuccess('Ticket successfully deleted!')
          return ticketActions.deleteTicketSuccess({ id: ticket.id });
        }),
        catchError(() => {
          this.toastr.error('Unable to delete ticket', 'Operation Failed');
          return EMPTY;
        })
      ))
    )
  );

  dispatchSuccess(successMsg: string) {
    this.store.dispatch(ticketActions.done());
    this.toastr.success(successMsg, 'Success');
  }
}
