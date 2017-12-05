import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as fromBank from '../store/bank.reducer';
import * as bankActions from '../store/bank.actions';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.css']
})
export class AccountIndexComponent implements OnInit {

  accounts: Observable<Account[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new bankActions.LoadAccounts());
    this.accounts = this.store.select(fromBank.selectAccounts);
  }

}
