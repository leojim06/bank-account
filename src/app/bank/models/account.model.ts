import { Transaction } from './transaction.model';

export interface Account {
  id: string;
  titular: string;
  capital: number;
  createdAt?: Date;
  numero_cuenta: string;
  transacciones?: Transaction[];
}
