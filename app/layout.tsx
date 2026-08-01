import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Your App",
  description: "Modern Next.js Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInForceRedirectUrl="/home"
      signUpForceRedirectUrl="/home"
    >
      <html lang="en" className={cn(roboto.variable)}>
        <body className="min-h-screen bg-background text-foreground antialiased">

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}