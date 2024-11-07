"use client";
import { FC, useState } from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { emailSchema } from "@/lib/validations/email";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { newsletterSignup } from "@/_actions/newsletter";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";

interface newsletterFormProps {}

type Inputs = z.infer<typeof emailSchema>;

const NewsletterForm: FC<newsletterFormProps> = ({}) => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data: Inputs) {
    if (!data.email) return;
    try {
      setIsPending(true);
      const res = await newsletterSignup(data.email);
      if (res?.error) throw new Error(res.error);
      toast("You have been subscribed to our newsletter.");
      form.reset();
    } catch (err) {
      catchError(err);
    } finally {
      setIsPending(false);
    }
  }
  return (
    <div className="flex">
      <Form {...form}>
        <form
          autoFocus={false}
          className="grid w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative space-y-0">
                <FormLabel className="sr-only"> Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="pr-12"
                    placeholder="joe@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
                <Button
                  className="absolute right-[3.5px] top-[4px] z-20 h-7 w-7"
                  size="icon"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2
                      name="loader-2"
                      className="h-3 w-3 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Send name="send" className="h-3 w-3" aria-hidden="true" />
                  )}
                  <span className="sr-only">Join newsletter</span>
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default NewsletterForm;
