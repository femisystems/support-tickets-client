import { createAction, props } from '@ngrx/store';
import { ISupportTicket } from '../interfaces/ticket';

/**
 * -------------------------------------------------------------------------
 * 
 * 
 * ACTION TYPES 
 * 
 * 
 * * -------------------------------------------------------------------------
 */
export const TICKETS_CREATE = 'TICKETS_CREATE';
export const TICKETS_CREATE_SUCCESS = 'TICKETS_CREATE_SUCCESS';
export const TICKETS_CREATE_FAILURE = 'TICKETS_CREATE_FAILURE';
export const TICKETS_GETALL = 'TICKETS_GETALL';
export const TICKETS_GETALL_SUCCESS = 'TICKETS_GETALL_SUCCESS';
export const TICKETS_GETALL_FAILURE = 'TICKETS_GETALL_FAILURE';
export const TICKETS_GET_BY_ID = 'TICKETS_GET_BY_ID';
export const TICKETS_GET_BY_ID_SUCCESS = 'TICKETS_GET_BY_ID_SUCCESS';
export const TICKETS_UPDATE = 'TICKETS_UPDATE';
export const TICKETS_UPDATE_SUCCESS = 'TICKETS_UPDATE_SUCCESS';
export const TICKETS_DELETE = 'TICKETS_DELETE';
export const TICKETS_DELETE_SUCCESS = 'TICKETS_DELETE_SUCCESS';
export const LOADING = 'LOADING';
export const DELETING = 'DELETING';
export const SAVING = 'SAVING';
export const DONE = 'DONE';
export const SEARCH = 'SEARCH'
export const DOSEARCH = 'DOSEARCH'

/**
 * -------------------------------------------------------------------------
 * 
 * 
 * ACTION CREATORS 
 * 
 * 
 * * -------------------------------------------------------------------------
 */
export const createTicket = createAction(TICKETS_CREATE, props<{ ticket: ISupportTicket }>());
export const createTicketSuccess = createAction(TICKETS_CREATE_SUCCESS, props<{ ticket: ISupportTicket }>());
export const createTicketError = createAction(TICKETS_CREATE_FAILURE, props<{ error: string }>());
export const getAll = createAction(TICKETS_GETALL);
export const getAllSuccess = createAction(TICKETS_GETALL_SUCCESS, props<{ tickets: ISupportTicket[] }>());
export const getAllFailure = createAction(TICKETS_GETALL_FAILURE, props<{ error: string }>());
export const getById = createAction(TICKETS_GET_BY_ID, props<{ id: number }>());
export const getByIdSuccess = createAction(TICKETS_GET_BY_ID_SUCCESS, props<{ ticket: ISupportTicket }>());
export const update = createAction(TICKETS_UPDATE, props<{ id: number; ticket: ISupportTicket }>());
export const updateSuccess = createAction(TICKETS_UPDATE_SUCCESS, props<{ ticket: ISupportTicket }>());
export const deleteTicket = createAction(TICKETS_DELETE, props<{ id: number }>());
export const deleteTicketSuccess = createAction(TICKETS_DELETE_SUCCESS, props<{ id: number }>());
export const loading = createAction(LOADING);
export const deleting = createAction(DELETING);
export const saving = createAction(SAVING);
export const done = createAction(DONE);
export const search = createAction(SEARCH, props<{ searchStr: string}>());
export const doSearch = createAction(DOSEARCH, props<{ searchResult: ISupportTicket[] }>());