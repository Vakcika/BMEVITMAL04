import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Gauge, Users, ArrowLeftRight, CalendarSync } from "lucide-react";
import SideBarBottom from "./SideBarBottom";
import SideBarBrand from "./SideBarBrand";
import SideBarItem from "./SideBarItem";

export default function SideBar() {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  return (
    <div className="relative flex">
      <button
        type="button"
        className="fixed top-0 right-0 z-50 inline-flex items-center p-2 mt-4 mr-4 text-sm text-n50 rounded-lg sm:hidden hover:bg-a300 hover:text-p300"
        onClick={() => setOpenNav(!openNav)}
      >
        <span className="sr-only">Toggle sidebar</span>
        <Menu className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-full sm:w-32 lg:w-64 h-screen transition-transform transform ${
          openNav ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-n10 text-n900 dark:text-n50 font-normal text-md font-paragraph border-2 border-n30 dark:border-n400 shadow-md`}
      >
        <div className="h-full px-3 py-4 overflow-y-scroll pb-28">
          <SideBarBrand />
          <div className="gradient-border"></div>
          <SideBarItem
            href={"/app/dashboard"}
            sideBarIcon={
              <Gauge className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Dashboard"
            active={location.pathname === "/app/dashboard"}
          />
          <SideBarItem
            href={"/app/customers"}
            sideBarIcon={
              <Users className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Customers"
            active={location.pathname === "/app/customers"}
          />
          <SideBarItem
            href={"/app/transactions"}
            sideBarIcon={
              <ArrowLeftRight className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Transactions"
            active={location.pathname === "/app/transactions"}
          />
          <SideBarItem
            href={"/app/subscriptions"}
            sideBarIcon={
              <CalendarSync className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Subscriptions"
            active={location.pathname === "/app/subscriptions"}
          />
        </div>
        <SideBarBottom />
      </aside>
    </div>
  );
}
