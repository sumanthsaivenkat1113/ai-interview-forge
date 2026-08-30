"use client";

import Link from "next/link";
import {
  Home,
  Bot,
  FolderOpen,
  BarChart3,
} from "lucide-react";

import Logo from "../../landing/logo";

const links = [
  {
    title: "Home",
    href: "/home",
    icon: Home,
    active: true,
  },
  {
    title: "My Interviews",
    href: "/my-interviews",
    icon: FolderOpen,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-8">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>

        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                target={item.title === "Reports" ? "_blank" : undefined}
                rel={item.title === "Reports" ? "noopener noreferrer" : undefined}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${item.active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`
                    transition-colors
                    ${item.active
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                    }
                  `}
                />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium">
            AI Interview Assistant
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Practice interviews anytime with personalized AI feedback.
          </p>
        </div>
      </div>
    </aside>
  );
}