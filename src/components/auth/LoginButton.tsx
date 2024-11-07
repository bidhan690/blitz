"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useLogin } from "@/hooks/useLogin";

interface LoginButtonProps {
  className?: string;
}

const LoginButton: FC<LoginButtonProps> = ({ className }) => {
  const modal = useLogin();
  const handleClick = () => {
    modal.setMode("login");
    modal.openModal();
  };
  return (
    <Button
      onClick={() => handleClick()}
      className={cn(
        "px-7 bg-[#525FE1] hover:bg-[#525FC1] text-white font-inter font-semibold",
        className
      )}
    >
      Login
    </Button>
  );
};

export default LoginButton;
