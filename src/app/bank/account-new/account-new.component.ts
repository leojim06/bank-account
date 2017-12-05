import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';

import * as bankActions from '../store/bank.actions';
import * as fromRoot from '../../store';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  createAccount(account: Account) {
    account ?
      this.store.dispatch(new bankActions.AddAccount({ account: account })) :
      this.router.navigate(['/accounts']);
  }

}
