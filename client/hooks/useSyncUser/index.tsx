"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    fetch("/api/v1/users", {
      method: "POST",
    }).catch(console.error);
  }, [isLoaded, isSignedIn]);

  return null;
}