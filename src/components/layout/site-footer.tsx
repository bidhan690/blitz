import { FC } from "react";
import MainFooter from "./main-footer";

interface siteFooterProps { }

const SiteFooter: FC<siteFooterProps> = ({ }) => {
  return (
    <footer>
      <div className="flex items-center">
        <MainFooter />
      </div>
    </footer>
  );
};

export default SiteFooter;
