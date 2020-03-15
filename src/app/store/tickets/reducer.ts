import { on, createReducer, Action } from '@ngrx/store';
import * as fromActions from './actions';
import { ISupportTicket } from 'src/app/interfaces/ticket';

export type State = ISupportTicket[];
export const initialState: State = [];

/**
 * Partial reducer to update store with a new ticket
 *
 * @param state - initial state
 * @param ticket - support ticket
 * @returns new state
 */
function createTicketSuccess(state: State, { ticket }) {
  return [ ...state, ticket];
}

/**
 * 
 * @param state - initial state
 * @param ticket - support ticket
 * @returns new state
 */
function updateTicketSuccess(state: State, { ticket }) {
  const newState = [...state];
  const index = state.findIndex(member => member['id'] === ticket.id);
  newState[index] = ticket;
  return newState;
}

/**
 * 
 * @param state - initial state
 * @param id - ticket id
 * @returns new state
 */
function deleteTicketSuccess(state: State, { id }) {
  const index = state.findIndex(member => member['id'] === id);
    const newState = [
      ...state.slice(0, index),
      ...state.slice(index + 1)
    ]
    return newState;
}

const reducerMap = [
  on(fromActions.createTicketSuccessAction, createTicketSuccess),
  on(fromActions.updateTicketSuccessAction, updateTicketSuccess),
  // on(fromActions.)
];

export function ticketReducer(state: State = [], action: Action) {
  return createReducer(initialState, ...reducerMap)(state, action);
}