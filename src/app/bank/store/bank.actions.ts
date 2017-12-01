import { Action } from '@ngrx/store';

import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

export const LOAD_ACCOUNTS = '[Bank] - Cargar cuentas registradas';
export const LOAD_ACCOUNTS_SUCCESS = '[Bank] - Cuentas registradas cargadas';

export const LOAD_ACCOUNT = '[Bank] - Cargar cuenta registrada por numero de cuenta';
export const LOAD_ACCOUNT_SUCCESS = '[Bank] - Cuenta cargada';

export const ADD_ACCOUNT = '[Bank] - Agregar cuenta';
export const ADD_ACCOUNT_SUCCESS = '[Bank] - Cuenta agregada con exito';

export const ADD_TRANSACTION = '[Bank] - Agregar transacción a cuenta';
export const ADD_TRANSACTION_SUCCESS = '[Bank] - Transacción agregada a la cuenta';

export class LoadAccounts implements Action {
  readonly type = LOAD_ACCOUNTS;
  constructor() { }
}

export class LoadAccountsSuccess implements Action {
  readonly type = LOAD_ACCOUNTS_SUCCESS;
  constructor(public payload: { accounts: Account[] }) { }
}

export class LoadAccount implements Action {
  readonly type = LOAD_ACCOUNT;
  constructor(public payload: { id: number }) { }
}

export class LoadAccountSuccess implements Action {
  readonly type = LOAD_ACCOUNT_SUCCESS;
  constructor(public payload: { account: Account }) { }
}

export class AddAccount implements Action {
  readonly type = ADD_ACCOUNT;
  constructor(public payload: { account: Account }) { }
}

export class AddAccountSuccess implements Action {
  readonly type = ADD_ACCOUNT_SUCCESS;
  constructor(public payload: { account: Account }) { }
}

export class AddTransaction implements Action {
  readonly type = ADD_TRANSACTION;
  constructor(public payload: { id: number, transaction: Transaction }) { }
}

export class AddTransactionSuccess implements Action {
  readonly type = ADD_TRANSACTION_SUCCESS;
  constructor(public payload: { account: Account, transaction: Transaction }) { }
}

export type All
  = LoadAccounts
  | LoadAccountsSuccess
  | LoadAccount
  | LoadAccountSuccess
  | AddAccount
  | AddAccountSuccess
  | AddTransaction
  | AddTransactionSuccess;
