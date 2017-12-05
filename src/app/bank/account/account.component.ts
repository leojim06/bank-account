import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  @Input() account: Account;

  constructor() { }

  ngOnInit() { }
}
