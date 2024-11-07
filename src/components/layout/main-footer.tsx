import { FC } from "react";
import MainLogo from "../MainLogo";
import Link from "next/link";
import NewsletterForm from "../forms/newsletter-form";
import { links, siteConfig } from "@/config/site";

interface mainFooterProps { }

const MainFooter: FC<mainFooterProps> = ({ }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full px-8 py-4 border-t bg-background">
      <div className="flex py-6 border-b flex-col gap-10 lg:flex-row lg:gap-20">
        <MainLogo />
        <div className="grid flex-1 grid-cols-2 gap-9 xxs:grid-cols-2 sm:grid-cols-4" >

          <div className="space-y-3">
            <h4 className="text-base font-medium">Useful Links</h4>
            <ul className="space-y-3">
              {
                UsefulLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} title={link.title} />
                ))
              }
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-medium">Help</h4>
            <ul className="space-y-3">
              {
                HelpLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} title={link.title} />
                ))
              }
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-medium">Social</h4>
            <ul className="space-y-3">
              {
                SocialLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} title={link.title} />
                ))
              }
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-medium">Company</h4>
            <ul className="space-y-3">
              {
                CompanyLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} title={link.title} />
                ))
              }
            </ul>
          </div>

        </div>
        <div className="space-y-2 flex flex-col">
          <h4 className="text-base font-medium">Subscribe to our newsletter</h4>
          <NewsletterForm />
        </div>
      </div>
      <div className="w-full mt-4 flex justify-between items-center">
        <h2 className="text-gray-600 text-base">{siteConfig.name} | Copyright &copy; {currentYear}</h2>
        <h2 className="text-gray-600 text-base">
          Built by{" "}
          <span className="text-gray-600 hover:text-black font-semibold ">
            <Link target="_blank" href={links.github}>
              {siteConfig.creator}
            </Link>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default MainFooter;

interface FooterLinkProps {
  href: string;
  title: string;
}

const FooterLink: FC<FooterLinkProps> = ({ href, title }) => {
  return <li >
    <Link
      href={href ?? "/"}
      target={"_blank"}

      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {title}
      <span className="sr-only">{title}</span>
    </Link>
  </li>
}

const UsefulLinks: { title: string, href: string }[] = [
  {
    title: "Legal & Privacy",
    href: "/legal"
  },
  {
    title: "Contact",
    href: "/contact"
  },
  {
    title: "Customer Service",
    href: "/customer-service"
  }, {
    title: "Account",
    href: "/account"
  }
]

const HelpLinks: { title: string, href: string }[] = [
  {
    title: "About",
    href: "/about"
  }, {
    title: "FAQ",
    href: "/faq"
  }, {
    title: "Terms",
    href: "/terms"
  }, {
    title: "Privacy",
    href: "/privacy"
  }
]

const SocialLinks: { title: string, href: string }[] = [
  {
    title: "Twitter",
    href: "https://twitter.com"
  },
  {
    title: "Github",
    href: "https://github.com/bidhan690"
  },
  {
    title: "Instagram",
    href: "https://instagram.com/bidhan_niroula"
  },
  {
    title: "Discord",
    href: "https://discord.com"
  }
]

const CompanyLinks: { title: string, href: string }[] = [
  {
    title: "About Us",
    href: "/about"
  }, {
    title: "Careers",
    href: "/careers"
  },
  {
    title: "Affiliates",
    href: "/affiliates"
  },
  {
    title: "Contact Us",
    href: "/contact-us"
  }
]


