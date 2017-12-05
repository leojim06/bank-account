import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account/account.component';
import { AccountIndexComponent } from './account-index/account-index.component';
import { BankService } from './bank.service';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountNewComponent } from './account-new/account-new.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountComponent,
    AccountIndexComponent,
    AccountFormComponent,
    AccountNewComponent
  ],
  providers: [BankService]
})
export class BankModule { }
