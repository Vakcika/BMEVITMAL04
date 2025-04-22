export default function Detail({
  label,
  value,
}: Readonly<{
  label: string;
  value: string | React.ReactNode;
}>) {
  return (
    <div>
      <p className="text-sm font-medium text-n100 mb-1">{label}</p>
      <span className="text-lg">{value}</span>
    </div>
  );
}
