import { Button } from "@/client/components/ui/button";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground"
      >
        Login
      </Button>

      <Button className="px-5">
        Signup
      </Button>
    </div>
  );
}