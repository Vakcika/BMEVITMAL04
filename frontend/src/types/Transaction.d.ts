import { UUID } from "crypto";

interface Transaction {
  id: UUID;
  customer: Customer;
  currency: Currency;
  transaction_type: TransactionType;
  subscription: Subscription | null;
  created_by: User;
  amount: number;
  amount_in_base: number;
  transaction_date: string;
  due_date: string | null;
  payment_date: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

interface Currency {
  id: number;
  code: string;
  symbol: string;
}

interface TransactionType {
  id: number;
  name: string;
}
