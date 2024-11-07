import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface NewsletterWelcomeEmailProps {
  email: string;
  fromEmail: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

const newsletterImages = [
  {
    src: `${baseUrl}/images/next.svg`,
    alt: "Blitz",
    credit: "ALLAN FRANCA CARMO",
    creditUrl:
      "https://www.pexels.com/photo/time-lapse-photography-of-man-doing-skateboard-trick-3133685/",
    description: "Next.js is a React framework for production",
  },
];

export default function NewsletterWelcomeEmail({
  email = "email@email.com",
  fromEmail,
}: NewsletterWelcomeEmailProps) {
  const previewText = `Hi ${email}, welcome to Blitz!`;

  return (
    <Html>
      <Head>
        <title>Blitz Newsletter</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                Blitz
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to Blitz ecommerce!
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                {`We're`} so glad {`you're`} here. {`We're`} excited to share
                our products with you.
              </Text>
              <Text className="m-0 text-center text-base">
                {`We'll`} be sending you a newsletter every month.
              </Text>
            </Section>
            <Section className="mt-6">
              <Img
                src={`${baseUrl}/images/blitz-newsletter.png`}
                alt="newsletter-welcome-image"
                height={250}
                className="aspect-video w-full object-cover"
              />
            </Section>
            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                {`We're`} looking forward to seeing you around! If you have any
                questions, please {`don't`} hesitate to reach out to us at{" "}
                <Link
                  href={`mailto:${fromEmail}`}
                  className="text-blue-500 underline"
                >
                  {fromEmail}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">
                @ Blitz {new Date().getFullYear()}
              </Text>
              <Text className="m-0">
                If you no longer want to receive these emails, you can{" "}
                <Link
                  href={`${baseUrl}/unsubscribe-newsletter`}
                  className="text-blue-500 underline"
                >
                  unsubscribe here
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
