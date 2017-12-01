import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account/account.component';
import { AccountIndexComponent } from './account-index/account-index.component';
import { BankService } from './bank.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccountComponent, AccountIndexComponent],
  providers: [BankService]
})
export class BankModule { }
