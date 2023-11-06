import { ThemeToggle } from "@/components/toggleTheme/toggle-theme";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center p-3">
        <h3>
          <Link href={"/"}>Energy Station</Link>
        </h3>
        <ThemeToggle />
      </header>
      <Separator />
    </>
  );
}
