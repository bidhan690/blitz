import { FC } from "react";
import { Button } from "../ui/button";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";

interface SignupButtonProps {
  className?: string;
}

const SignupButton: FC<SignupButtonProps> = ({ className }) => {
  const modal = useLogin();
  const handleClick = () => {
    modal.setMode("signup");
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
      Sign up
    </Button>
  );
};

export default SignupButton;
