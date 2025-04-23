interface Subscription {
  id: number;
  customer_id: number;
  billing_cycle_id: number;
  currency_id: number;
  name: string;
  amount: number;
  start_date: string;
  end_date: string;
}
