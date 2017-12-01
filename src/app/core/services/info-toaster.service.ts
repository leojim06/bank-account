import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';

import { Account } from '../../bank/models/account.model';
import { Transaction } from '../../bank/models/transaction.model';

export enum ErrorTypeBankToaster {
  LOAD, ADD_ACCOUNT, ADD_TRANSACTION
}

@Injectable()
export class InfoToasterService {

  constructor(private toasterService: ToasterService) { }

  public bankActionsFailToaster(typeError: ErrorTypeBankToaster) {
    const errorToaster: Toast = {
      type: 'error',
      title: 'Problemas con el banco'
    };

    switch (typeError) {
      case ErrorTypeBankToaster.LOAD: {
        errorToaster.body = 'No se pudo cargar las cuentas';
        this.toasterService.pop(errorToaster);
        break;
      }
      case ErrorTypeBankToaster.ADD_ACCOUNT: {
        errorToaster.body = 'No se pudo crear su cuenta';
        this.toasterService.pop(errorToaster);
        break;
      }
      case ErrorTypeBankToaster.ADD_TRANSACTION: {
        errorToaster.body = 'No se pudo agregar la transacción a su cuenta';
        this.toasterService.pop(errorToaster);
        break;
      }
      default:
        break;
    }
  }

  public addAccountSuccessToaster(account: Account) {
    this.toasterService.pop(
      'success',
      'Cuenta creada',
      `Cliente ${account.titular}, su cuenta se ha creado con $${account.capital}`
    );
  }

  public addTransactionSuccessToaster(transaction: Transaction) {
    this.toasterService.pop(
      'success',
      'Transacción exitosa',
      transaction.valor > 0 ?
        `Se ha abonado ${transaction.valor} a su cuenta` :
        `Se ha descontado ${transaction.valor} de su cuenta`
    );
  }

}
