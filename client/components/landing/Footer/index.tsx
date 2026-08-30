import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="#formats" className="transition-colors hover:text-foreground">
            Formats
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AI InterviewForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}