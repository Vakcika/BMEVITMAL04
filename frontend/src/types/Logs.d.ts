export interface Log {
  id?: int;
  customer: Customer;
  user: User;
  type: LogType;
  follow_up_date: string | null;
  description: string;
  created_at?: string;
  updated_at?: string;
}

interface LogType {
  id: number;
  name: string;
}

interface LogDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: Log) => Promise<void>;
  initialValues: Log;
  title?: string;
  description?: string;
  isEditMode?: boolean;
}
