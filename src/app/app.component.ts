import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Modal } from 'ngx-modialog/plugins/vex';

import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromBank from './bank/store/bank.reducer';
import * as bankActions from './bank/store/bank.actions';
import { Account } from './bank/models/account.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  toasterconfig: ToasterConfig = new ToasterConfig({
    animation: 'fade',
    timeout: 6000,
    preventDuplicates: true,
    mouseoverTimerStop: true
  });

  accounts: Observable<Account[]>;

  constructor(
    private modal: Modal,
    private toasterService: ToasterService,

    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new bankActions.LoadAccounts());
    this.accounts = this.store.select(fromBank.selectAccounts);
  }

  onClick() {
    this.modal.confirm()
      .isBlocking(true)
      .showCloseButton(false)
      .keyboard(27)
      .okBtn('Aceptar')
      .message('Este es el boton de alerta')
      .open()
      .result
      .then(result => this.toasterService.pop('success', 'Hola', 'Toaster service'))
      .catch(result => this.toasterService.pop('error', 'Hola', 'Toaster Service'));
  }
}
