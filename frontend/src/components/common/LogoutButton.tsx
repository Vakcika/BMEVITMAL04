// components/auth/LogoutButton.tsx
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

export default function LogoutButton() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const logoutMutation = useHttpPost("/api/logout");

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(user);
      setIsLogoutDialogOpen(false);
      toast.success("You have been logged out!");
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ??
        error?.message ??
        "An error occurred while trying to logout.";

      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="block sm:hidden lg:flex items-center justify-center"
        aria-label="Logout"
        onClick={() => setIsLogoutDialogOpen(true)}
      >
        <LogOut className="w-6 h-6" />
      </button>

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
    </>
  );
}
