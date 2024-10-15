import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './transaction.actions';
import { Transaction } from '../models/transaction.model';
import { AppState } from '../app.reducer';

export interface State {
    items: Transaction[]; 
}

export interface AppStateAdmin extends AppState{
    transaction: State;
}

export const initialState: State = {
   items: [],
}

const _transactionReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items: [...items]})),
    on(unsetItems, state => ({ ...state, items: []})),

);

export function transactionReducer(state: State = initialState, action: Action) {
    return _transactionReducer(state, action);
}