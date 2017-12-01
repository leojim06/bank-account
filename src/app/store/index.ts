import { ActionReducerMap } from '@ngrx/store';

import * as fromBank from '../bank/store/bank.reducer';

export interface State {
  bank: fromBank.State;
}

export const reducer: ActionReducerMap<State> = {
  bank: fromBank.reducer
};
