"use client";

import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import dynamic from "next/dynamic";

// Lazy load the FeaturesBentoGrid component
const FeaturesBentoGrid = dynamic(
  () =>
    import("./_components/FeaturesBentoGrid").then((mod) => ({
      default: mod.FeaturesBentoGrid,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-muted-foreground">
          Loading features...
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="relative mx-auto my-10 flex flex-col items-center justify-center">
      <Navbar />
      <div
        className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />

      <main className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-800 md:text-4xl lg:text-7xl dark:text-slate-100">
          {"Revolutionize Patient Care with AI-Powered Medical Solutions."
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-6 text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-300"
        >
          Deliver instant, accurate medical assistance through natural voice
          conversations. Automate appointment scheduling, symptom triage and
          follow-up care 24/7
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleGetStarted}
            className="w-60 transform rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 active:translate-y-0"
            aria-label={
              user ? "Go to dashboard" : "Get started with MediAssist"
            }
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-border bg-card p-4 shadow-2xl"
        >
          <div className="w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="aspect-[16/9] flex items-center justify-center p-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <svg
                    className="w-32 h-32 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8V12L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      fill="currentColor"
                      opacity="0.2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    AI-Powered Healthcare
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Experience the future of medical consultations with our
                    intelligent voice-enabled AI specialists
                  </p>
                </div>
                <div className="flex justify-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">
                      Available
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">10+</div>
                    <div className="text-sm text-muted-foreground">
                      Specialists
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      Instant
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Response
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <FeaturesBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  return (
    <nav
      className="flex w-full items-center justify-between border-t border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <Logo textSize="lg" />
      {!user ? (
        <Link href="/sign-in" aria-label="Login to your account">
          <button className="w-24 md:w-32 transform rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <Button
            onClick={handleDashboardClick}
            className="shadow-md hover:shadow-lg"
            aria-label="Go to dashboard"
          >
            Dashboard
          </Button>
          <UserButton />
        </div>
      )}
    </nav>
  );
};
