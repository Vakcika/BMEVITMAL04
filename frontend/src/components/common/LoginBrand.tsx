import { ServerCog } from "lucide-react";

export default function LoginBrand() {
  return (
    <a
      href="/"
      className="flex flex-row items-center justify-center lg:ps-2.5 mb-1 gap-1 font-brand font-thin"
    >
      <ServerCog className="text-p300" height={48} width={48} />
      <span className="flex self-center text-5xl font-semibold whitespace-nowrap text-p300">
        CRM Portal
      </span>
    </a>
  );
}
