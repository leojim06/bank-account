import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';
import * as bankActions from './bank.actions';

export interface State {
  accounts: Account[];
  selectedAccount: Account | null;
}

export const initialState: State = {
  accounts: [],
  selectedAccount: null
};

export function reducer(state: State = initialState, actions: bankActions.All): State {
  switch (actions.type) {
    case bankActions.LOAD_ACCOUNTS_SUCCESS: {
      return Object.assign({}, state, { accounts: actions.payload.accounts });
    }
    case bankActions.LOAD_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, { selectedAccount: actions.payload.account });
    }
    case bankActions.ADD_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        accounts: [...state.accounts, actions.payload.account]
      });
    }
    case bankActions.ADD_TRANSACTION_SUCCESS: {
      return Object.assign({}, state, {
        accounts: state.accounts.map(account => {
          if (account.id === actions.payload.account.id) {
            return Object.assign({}, actions.payload.account);
          }
        })
      });
    }

    default: {
      return state;
    }
  }
}

export const selectBankState = createFeatureSelector<State>('bank');

export const selectCurrenctAccount = createSelector(selectBankState,
  (state: State) => state.selectedAccount);
export const selectAccounts = createSelector(selectBankState,
  (state: State) => state.accounts);
