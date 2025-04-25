import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";
import EmailLink from "@/components/common/links/EmailLink";
import PhoneLink from "@/components/common/links/PhoneLink";
import { Building, Mail, Phone, User } from "lucide-react";

export default function CustomerInfoCard({
  customer,
}: Readonly<{
  customer: Customer;
}>) {
  const navigate = useNavigate();

  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customer Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/app/customer/${customer.id}`)}
        >
          <Building className="w-4 h-4 mr-2" />
          View Customer
        </Button>
      </CardHeader>
      <CardContent>
        {customer ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <DetailWithIcon
              icon={<User className="w-6 h-6 text-n100" />}
              label="Contact"
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
          </div>
        ) : (
          <p>No customer information available.</p>
        )}
      </CardContent>
    </Card>
  );
}
