"use client";

import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/client/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

interface StartInterviewButtonProps {
  label: string;
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
}

export default function StartInterviewButton({
  label,
  size = "lg",
  className = "px-6",
}: StartInterviewButtonProps) {
  return (
    <>
      {/* Already signed in: skip the modal entirely and go straight to /home. */}
      <Show when="signed-in">
        <Link href="/home">
          <Button size={size} className={className}>
            {label}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </Link>
      </Show>

      {/* Signed out: open the sign-up modal, then land on /home after auth. */}
      <Show when="signed-out">
        <SignUpButton mode="modal" forceRedirectUrl="/home">
          <Button size={size} className={className}>
            {label}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </SignUpButton>
      </Show>
    </>
  );
}