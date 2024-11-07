"use client"
import { FC, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Icon from "@/lib/DynamicIcon";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";
interface OAuthButtonsProps { }

const oauthProviders = [
  { name: "Google", strategy: "google", icon: "/icons/google.svg" },
  { name: "Auth0", strategy: "auth0", icon: "/icons/auth0.svg" },
] satisfies {
  name: string;
  icon: string;
  strategy: string;
}[];

const OAuthButtons: FC<OAuthButtonsProps> = ({ }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  async function oauthSignIn(provider: string) {
    try {
      setIsLoading(provider);
      signIn(provider);
    } catch (error) {
      setIsLoading(null);
      catchError(error)
    }
  }
  return (
    <>
      {oauthProviders.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          onClick={() => void oauthSignIn(provider.strategy)}
          aria-label={`Sign in with ${provider.name}`}
          disabled={isLoading === provider.strategy}
        >
          {isLoading === provider.strategy && (
            <Icon name="loader-2" className="w-4 h-4 animate-spin mr-3" />
          )}
          {!isLoading && (
            <Image
              width={30}
              height={30}
              src={`${provider.icon}`}
              alt={provider.name}
              className="mr-2"
            />
          )}
          Continue with {provider.name}
        </Button>
      ))}
    </>
  );
};

export default OAuthButtons;
