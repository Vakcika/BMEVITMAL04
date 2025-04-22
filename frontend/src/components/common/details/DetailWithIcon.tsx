export default function DetailWithIcon({
  icon,
  label,
  value,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}>) {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3">{icon}</div>
      <div>
        <p className="text-sm font-medium text-n100 mb-1">{label}</p>
        <span className="text-lg">{value}</span>
      </div>
    </div>
  );
}
