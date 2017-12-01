import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Account } from './models/account.model';
import { Transaction } from './models/transaction.model';

@Injectable()
export class BankService {

  readonly API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.API_URL}/accounts`);
  }

  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.API_URL}/accounts/${id}`);
  }

  addAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(
      `${this.API_URL}/accounts`,
      account
    );
  }

  addTransactionById(id: number, transaction: Transaction): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/accounts/${id}/transaccion`,
      transaction
    );
  }

}
