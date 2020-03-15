import { createAction, props } from '@ngrx/store';
import { ISupportTicket } from 'src/app/interfaces/ticket';

/**
 * -------------------------------------------------------------------------
 * 
 * 
 * ACTION TYPES 
 * 
 * 
 * * -------------------------------------------------------------------------
 */
export const CREATE_TICKET = '[Ticket] Create';
export const CREATE_TICKET_SUCCESS = '[Ticket] Create Success';
export const FETCH_TICKETS = '[Ticket] Fetch';
export const FETCH_TICKETS_SUCCESS = '[Ticket] Fetch Success';
export const UPDATE_TICKET = '[Ticket] Update';
export const UPDATE_TICKET_SUCCESS = '[Ticket] Update Success';
export const DELETE_TICKET = '[Ticket] Delete';
export const DELETE_TICKET_SUCCESS = '[Ticket] Delete Success';

 /**
 * -------------------------------------------------------------------------
 * 
 * 
 * ACTION CREATORS 
 * 
 * 
 * * -------------------------------------------------------------------------
 */
export const createTicketAction = createAction(CREATE_TICKET, props<{ payload: ISupportTicket }>());
export const createTicketSuccessAction = createAction(CREATE_TICKET_SUCCESS, props<{ ticket: ISupportTicket }>());
export const fetchTicketsAction = createAction(FETCH_TICKETS);
export const fetchTicketsSuccessAction = createAction(FETCH_TICKETS_SUCCESS, props<{ tickets: ISupportTicket[] }>());
export const updateTicketAction = createAction(UPDATE_TICKET, props<{ ticket: ISupportTicket }>());
export const updateTicketSuccessAction = createAction(UPDATE_TICKET_SUCCESS, props<{ ticket: ISupportTicket }>());
export const deleteTicketSuccessAction = createAction(DELETE_TICKET, props<{ id: string }>());