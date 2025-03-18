import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useHttpPost from "@/api/useHttpPost";
import { toast } from "sonner";

export default function SideBarBottom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const logoutMutation = useHttpPost("/api/logout");

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(user);
      setIsLogoutDialogOpen(false);
      toast("You have been logged out!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              alt={`${user?.user?.name}'s profile`}
              loading="lazy"
            />
          </button>
          <span className="text-sm block sm:hidden lg:block">
            {user?.user?.name}
          </span>
          <button
            type="button"
            className="block sm:hidden lg:flex items-center justify-center"
            aria-label="Logout"
            onClick={() => setIsLogoutDialogOpen(true)}
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will need to log in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-p200 hover:bg-p300"
            >
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
