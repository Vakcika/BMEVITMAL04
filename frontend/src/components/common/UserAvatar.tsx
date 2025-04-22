import React from "react";

interface UserAvatarProps {
  user: string | undefined;
  size?: "sm" | "md" | "lg";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "md" }) => {
  if (!user) return null;

  const getInitial = () => {
    return user.slice(0, 1);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-sm";
      case "lg":
        return "w-12 h-12 text-xl";
      case "md":
      default:
        return "w-10 h-10 text-lg";
    }
  };

  return (
    <span
      className={`bg-p75 rounded-full font-bold flex items-center justify-center ${getSizeClasses()}`}
      title={user}
    >
      {getInitial()}
    </span>
  );
};

export default UserAvatar;
