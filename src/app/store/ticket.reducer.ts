import { createReducer, on, Action } from '@ngrx/store';
import {
  createTicketSuccess,
  createTicketFailure,
  getAllSuccess,
  doSearch,
  updateTicketSuccess,
  updateTicketFailure,
  deleteTicketSuccess,
  getAllFailure,
  loading,
  deleting,
  saving,
  done
} from './ticket.actions';
import { ISupportTicket } from '../interfaces/ticket';

export type ITicket = ISupportTicket[];
export const ticketsInitialState: ITicket = [];

const getAllSuccessFn = (state: ITicket, { tickets }) => {
  return [...tickets]
}

const _ticketReducer = createReducer(ticketsInitialState,
  on(createTicketSuccess, (state, { ticket }) => [...state, ticket] ),
  on(getAllSuccess, getAllSuccessFn),
  on(updateTicketSuccess, (state, { ticket }) => {
    const newState = [...state];
    const index = state.findIndex(member => member['id'] === ticket.id);
    newState[index] = ticket;
    return newState;
  }),
  on(deleteTicketSuccess, (state, { id }) => {
    const index = state.findIndex(member => member['id'] === id);
    const newState = [
      ...state.slice(0, index),
      ...state.slice(index + 1)
    ]
    return newState;
  })
);

export function ticketReducer(state: ITicket, action: Action) {
  return _ticketReducer(state, action);
}


/*
 * ---------------------------------------------------------------------------------
 * 
 * Error
 * 
 * ---------------------------------------------------------------------------------
 */
export type IError = {};
export const errorInitialState: IError = {}

const operationFailFn = (state: IError, { ctx, msg }) => {
  return { ...state, ctx: msg };
}

const _errorReducer = createReducer(errorInitialState,
  on(getAllFailure, operationFailFn),
  on(createTicketFailure, operationFailFn),
  on(updateTicketFailure, operationFailFn)
);

export function errorReducer(state: IError, action: Action) {
  return _errorReducer(state, action);
}


/*
 * ---------------------------------------------------------------------------------
 * 
 * Search
 * 
 * ---------------------------------------------------------------------------------
 */
export type ISearchResult = [];
export const searchInitialState: ISearchResult = [];
const getSearchResult = (state: ISearchResult, { searchResult }) => {
  return [ ...searchResult ];
}

const _searchReducer = createReducer(searchInitialState,
  on(doSearch, getSearchResult)
);

export function searchReducer(state, action) {
  return _searchReducer(state, action)
}


/*
 * ---------------------------------------------------------------------------------
 * 
 * loaders
 * 
 * ---------------------------------------------------------------------------------
 */
export type ILoader = {};
const loaderInitialState: ILoader = {};

const loadingTickets = (state: ILoader) => {
  return { isLoading: true };
}

const deletingTicket = (state: ILoader) => {
  return { isDeleting: true };
}

const savingTicket = (state: ILoader) => {
  return { isSaving: true };
}

const stopLoaders = () => ({});

const _loaderReducer = createReducer(loaderInitialState,
  on(loading, loadingTickets),
  on(deleting, deletingTicket),
  on(saving, savingTicket),
  on(done, stopLoaders)
);

export function loaderReducer(state: ILoader, action: Action) {
  return _loaderReducer(state, action);
}
