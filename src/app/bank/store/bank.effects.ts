import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import * as bankActions from './bank.actions';
import { BankService } from '../bank.service';
import { InfoToasterService, ErrorTypeBankToaster } from '../../core/services/info-toaster.service';
import { AppSocketIoService } from '../../app.socketio.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';


@Injectable()
export class BankEffects {

  constructor(
    private actions: Actions,
    private bankService: BankService,
    private infoToasterService: InfoToasterService,
    private appSocketIoService: AppSocketIoService,
    private router: Router
  ) { }

  @Effect()
  getAccounts = this.actions
    .ofType(bankActions.LOAD_ACCOUNTS)
    .switchMap(action => this.bankService.getAccounts()
      .map((accounts: Account[]) => new bankActions.LoadAccountsSuccess({ accounts }))
      .catch((error: any) => {
        this.infoToasterService.bankActionsFailToaster(ErrorTypeBankToaster.LOAD);
        return Observable.empty();
      })
    );

  @Effect()
  getAccountById = this.actions
    .ofType(bankActions.LOAD_ACCOUNT)
    .map(toPayload)
    .switchMap(payload => this.bankService.getAccountById(payload.id)
      .map((account: Account) => new bankActions.LoadAccountSuccess({ account }))
      .catch((error: any) => {
        this.infoToasterService.bankActionsFailToaster(ErrorTypeBankToaster.LOAD);
        return Observable.empty();
      })
    );

  @Effect()
  addAccount = this.actions
    .ofType(bankActions.ADD_ACCOUNT)
    .map(toPayload)
    .switchMap(payload => this.bankService.addAccount(payload.account)
      .map((account: Account) => {
        this.infoToasterService.addAccountSuccessToaster(account);
        this.appSocketIoService.emitEventOnAccountSaved(account);
        this.router.navigate(['/accounts']);
        return new bankActions.AddAccountSuccess({ account });
      })
      .catch((error: any) => {
        this.infoToasterService.bankActionsFailToaster(ErrorTypeBankToaster.ADD_ACCOUNT);
        return Observable.empty();
      })
    );

  @Effect()
  addTransaction = this.actions
    .ofType(bankActions.ADD_TRANSACTION)
    .map(toPayload)
    .switchMap((payload: { id: number, transaction: Transaction }) =>
      this.bankService.addTransactionById(payload.id, payload.transaction)
        .map((response: { account: Account, transaction: Transaction }) => {
          this.infoToasterService.addTransactionSuccessToaster(response.transaction);
          return new bankActions.AddTransactionSuccess(response);
        })
        .catch((error: any) => {
          this.infoToasterService.bankActionsFailToaster(ErrorTypeBankToaster.ADD_TRANSACTION);
          return Observable.empty();
        })
    );

}
