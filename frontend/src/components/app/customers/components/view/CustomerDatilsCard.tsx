import {
  Building,
  UserCheck,
  User,
  Mail,
  Phone,
  Globe,
  Hash,
  CalendarClock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";
import EmailLink from "@/components/common/links/EmailLink";
import PhoneLink from "@/components/common/links/PhoneLink";
import WebsiteLink from "@/components/common/links/WebsiteLink";
import UserAvatar from "@/components/common/UserAvatar";

export default function CustomerDetailsCard({
  customer,
}: Readonly<{
  customer: Customer;
}>) {
  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2">
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailWithIcon
            icon={<Building className="w-6 h-6 text-n100" />}
            label="Company"
            value={customer.company_name}
          />
          <DetailWithIcon
            icon={<UserCheck className="w-6 h-6 text-n100" />}
            label="Assigned to"
            value={<UserAvatar user={customer.user?.name} />}
          />
          <DetailWithIcon
            icon={<User className="w-6 h-6 text-n100" />}
            label="Contact Name"
            value={customer.name}
          />
          <DetailWithIcon
            icon={<Mail className="w-6 h-6 text-n100" />}
            label="Email"
            value={<EmailLink customer={customer} />}
          />
          <DetailWithIcon
            icon={<Phone className="w-6 h-6 text-n100" />}
            label="Phone"
            value={<PhoneLink customer={customer} />}
          />
          <DetailWithIcon
            icon={<Globe className="w-6 h-6 text-n100" />}
            label="Website"
            value={
              customer.website ? <WebsiteLink url={customer.website} /> : "N/A"
            }
          />
          <DetailWithIcon
            icon={<Hash className="w-6 h-6 text-n100" />}
            label="Tax Number"
            value={customer.tax_number ?? "N/A"}
          />
          <DetailWithIcon
            icon={<CalendarClock className="w-6 h-6 text-n100" />}
            label="Created At"
            value={new Date(customer.created_at).toLocaleString()}
          />
        </div>
      </CardContent>
    </Card>
  );
}
