import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link2, BarChart3, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Shorten any URL",
    description:
      "Turn long, unwieldy links into clean, shareable short URLs in one click.",
  },
  {
    icon: BarChart3,
    title: "Track performance",
    description:
      "See how many times each link has been clicked with built-in analytics.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description:
      "Redirects happen in milliseconds so your audience never waits.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & reliable",
    description:
      "All links are stored safely and available around the clock.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center">
      <section className="flex flex-col items-center text-center px-4 py-24 gap-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight leading-tight">
          Shorten links,{" "}
          <span className="text-primary">amplify your reach</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl">
          Create short, memorable links in seconds. Track performance and manage
          all your URLs in one place.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <SignUpButton mode="modal">
            <Button size="lg">Get started free</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="size-8" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
