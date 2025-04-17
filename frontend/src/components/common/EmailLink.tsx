interface EmailLinkProps {
  email: string;
}

const EmailLink = ({ email }: EmailLinkProps) => {
  return (
    <a href={`mailto:${email}`} className="text-p500 hover:underline">
      {email}
    </a>
  );
};

export default EmailLink;
