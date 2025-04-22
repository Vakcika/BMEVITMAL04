interface PhoneLinkProps {
  phone: string | null;
}

const PhoneLink = ({ phone }: PhoneLinkProps) => {
  return (
    <a href={`tel:${phone}`} className="text-p500 hover:underline">
      {phone}
    </a>
  );
};

export default PhoneLink;
