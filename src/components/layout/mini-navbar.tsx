import { FC } from "react";
import MainLogo from "../MainLogo";
import LoginButton from "../auth/LoginButton";

interface MiniNavbarProps { }

const MiniNavbar: FC<MiniNavbarProps> = ({ }) => {
  return (
    <div className="w-full px-2 flex justify-between lg:hidden">
      <MainLogo />
    </div>
  );
};

export default MiniNavbar;
