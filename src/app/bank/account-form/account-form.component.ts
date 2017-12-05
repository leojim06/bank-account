import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Account | null>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'titular': ['', Validators.required],
      'capital': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      const newAccount: Account = this.form.value;
      newAccount.numero_cuenta = this.generateAccountNumber();
      this.onSubmit.emit(newAccount);
    }
  }

  cancelNewAccount() {
    this.onSubmit.emit(null);
  }

  private generateAccountNumber(): string {
    return '4000-1234-1598-0003';
  }

}
