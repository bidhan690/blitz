"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Icons } from "../icons";

interface LogoutProps {
  className?: string;
  text?: string;
  hideIcon?: boolean;
}

const Logout: FC<LogoutProps> = ({ className, text, hideIcon = false }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("px-0.5 h-full w-full justify-start", className)}
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      {!hideIcon ? (
        <Icons.logout
          className="mr-2 h-4 w-4"
          aria-hidden="true"
        />
      ) : null}
      {text ?? "Log out"}
    </Button>
  );
};

export default Logout;
