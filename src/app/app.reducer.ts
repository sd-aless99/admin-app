import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'
import * as transaction from './admin/transaction.reducer';

export interface AppState {
   ui: ui.State,
   user: auth.State,
   transaction: transaction.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   transaction: transaction.transactionReducer
}