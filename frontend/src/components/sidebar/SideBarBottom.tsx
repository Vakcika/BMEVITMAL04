import { LogOut } from "lucide-react";

export default function SideBarBottom() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-n10">
      <div className="w-full">
        <div className="gradient-border" />
        <div className="flex items-center justify-between sm:justify-center lg:justify-between p-4 mx-16 sm:mx-0">
          <button
            type="button"
            className="flex items-center justify-center"
            aria-label="Open user menu"
          >
            <img
              className="w-11 h-11 rounded-lg object-cover"
              src={`https://picsum.photos/200`}
              alt={`test's profile`}
              loading="lazy"
            />
          </button>
          <span className="text-sm block sm:hidden lg:block">test</span>
          <button
            type="button"
            className="block sm:hidden lg:flex items-center justify-center"
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
