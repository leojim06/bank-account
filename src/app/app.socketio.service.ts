import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';

import { Account } from './bank/models/account.model';
import { Transaction } from './bank/models/transaction.model';

import * as fromRoot from './store';
import * as fromBank from './bank/store/bank.reducer';
import * as bankActions from './bank/store/bank.actions';

@Injectable()
export class AppSocketIoService {
  private socket: SocketIOClient.Socket;

  constructor(
    private toasterService: ToasterService,
    private store: Store<fromRoot.State>
  ) {
    this.socket = io('http://localhost:3000');
  }

  emitEventOnUserConnected() {
    this.socket.emit('user connected');
  }

  emitEventOnAccountSaved(account: Account) {
    this.socket.emit('account saved', account);
  }

  emitEventOnTransactionSaved(account: Account, transaction: Transaction) {
    this.socket.emit('transaction saved in account', { account, transaction });
  }

  consumeEventOnUserConnected() {
    this.socket.on('user connected', (message) => {
      this.toasterService.pop(
        'info',
        'BIENVENIDO',
        `Nuestro banco está a su servicio. ${message}`
      );
    });
  }

  consumeEventOnAccountSaved() {
    this.socket.on('account saved', (account: Account) => {
      this.store.dispatch(new bankActions.AddAccountSuccess({ account }));
      this.toasterService.pop(
        'info',
        'NUEVA CUENTA CREADA',
        `Se acaba de crear la cuenta de ${account.titular}`
      );

    });
  }

  consumeEventOnTransactionSaved() {
    this.socket.on('transaction saved in account', (account: Account, transaction: Transaction) => {
      this.toasterService.pop(
        'info',
        'NUEVA TRANSACCIÓN EN PROCESO',
        `Se ha realizado una transacción por ${transaction.valor} desde la cuenta de ${account.titular}`
      );
    });
  }

}
