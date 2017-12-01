import { Transaction } from './transaction.model';

export interface Account {
  id: number;
  titular: string;
  capital: number;
  createdAt: Date;
  numero_cuenta: string;
  transacciones: Transaction[];
}
