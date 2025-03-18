type SideBarItemProps = {
  href: string;
  sideBarIcon: React.ReactNode;
  sideBarName?: string;
  active: boolean;
};

export default function SideBarItem({
  href,
  sideBarIcon,
  sideBarName,
  active,
}: Readonly<SideBarItemProps>) {
  return (
    <ul
      className={`space-y-2 my-2 text-center group hover:bg-n0 hover:shadow-md rounded-lg ${
        active ? "bg-n0 shadow-md" : ""
      }`}
    >
      <li>
        <a
          href={href}
          className="flex flex-row sm:flex-col lg:flex-row items-center justify-start sm:justify-center lg:justify-start p-2"
        >
          <div
            className={`rounded-xl shadow-md p-3   ${
              active
                ? "bg-p300 text-n0 group-hover:bg-p300"
                : " bg-n0 group-hover:text-n0 group-hover:bg-p300"
            }`}
          >
            {sideBarIcon}
          </div>
          <span className="mt-0 ms-3 text-left sm:mt-2 sm:ms-0 lg:mt-0 lg:ms-3 lg:text-left">
            {sideBarName}
          </span>
        </a>
      </li>
    </ul>
  );
}
