interface Customer {
  id: number;
  user: User | null;
  status: CustomerStatus;
  company_name: string;
  name: string;
  phone_number: string | null;
  email: string;
  address: string | null;
  tax_number: string | null;
  website: string | null;
  description: string | null;
  created_at: string;
  updated_at?: string;
}

interface CustomerStatus {
  id: number;
  name: string;
}
