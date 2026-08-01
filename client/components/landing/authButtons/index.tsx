"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/client/components/ui/button";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <SignInButton mode="modal" forceRedirectUrl="/home">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Login
          </Button>
        </SignInButton>

        <SignUpButton mode="modal" forceRedirectUrl="/home">
          <Button className="px-5">Signup</Button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}