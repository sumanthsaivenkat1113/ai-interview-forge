import AuthButtons from "../authButtons";
import Logo from "../logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <AuthButtons />
      </nav>
    </header>
  );
}