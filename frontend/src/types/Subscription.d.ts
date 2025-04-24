import { StringToBoolean } from "class-variance-authority/types";
import { Currency } from "./Transaction";

interface Subscription {
  id: number;
  customer: Customer;
  billing_cycle: BillingCycle;
  currency: Currency;
  name: string;
  amount: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}

interface BillingCycle {
  id: number;
  name: string;
}
