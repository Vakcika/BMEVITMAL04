import LazyImage from "../common/LazyImg";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import LogoutButton from "../common/LogoutButton";

export default function SideBarBottom() {
  const { user } = useAuth();

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
            <LazyImage
              className="w-11 h-11 rounded-lg object-cover"
              src={`https://picsum.photos/200`}
              alt={`${user?.user?.name}'s profile`}
              loading="lazy"
            />
          </button>
          <span className="text-sm block sm:hidden lg:block">
            {user?.user?.name}
          </span>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
