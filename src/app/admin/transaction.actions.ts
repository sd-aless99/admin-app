import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const setItems = createAction(
    '[Transactions] Set Items',
    props<{items: Transaction[]}>());

    export const unsetItems = createAction('[Transactions] UnSet Items');