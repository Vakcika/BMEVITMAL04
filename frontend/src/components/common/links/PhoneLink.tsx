import { useLogDialogContext } from "@/components/app/logs/LogDialogProvider";


const PhoneLink = ({ customer }: { customer?: Customer }) => {
  const { openLogDialog } = useLogDialogContext();

  if (!customer?.phone_number) return null;

  const handleClick = () => {
    openLogDialog({
      type: "phone",
      customer,
    });
  };

  return (
    <a
      href={`tel:${customer?.phone_number}`}
      onClick={handleClick}
      className="text-p500 hover:underline"
    >
      {customer?.phone_number}
    </a>
  );
};

export default PhoneLink;
