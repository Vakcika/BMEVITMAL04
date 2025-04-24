import { useLogDialogContext } from "@/components/app/logs/LogDialogProvider";

const EmailLink = ({ customer }: { customer?: Customer }) => {
  const { openLogDialog } = useLogDialogContext();

  if (!customer?.email) return null;

  const handleClick = () => {
    openLogDialog({ type: "email", customer });
  };

  return (
    <a
      href={`mailto:${customer?.email}`}
      onClick={handleClick}
      className="text-p500 hover:underline"
    >
      {customer?.email}
    </a>
  );
};

export default EmailLink;
