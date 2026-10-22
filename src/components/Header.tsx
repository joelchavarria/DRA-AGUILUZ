"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/config/site";
import { Brand } from "@/components/Brand";

export function Header() {
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="page-width header-inner flex items-center justify-between">
        <Brand variant="header" />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={path === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="menu-trigger"
              aria-label="Abrir menú"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetHeader>
              <SheetTitle>Clínica Dental Dra. Aguiluz</SheetTitle>
              <SheetDescription>
                Atención cercana en Granada, Nicaragua.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Navegación móvil">
              {navigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={path === item.href ? "page" : undefined}
                  >
                    {item.label}
                    <ArrowUpRight size={18} />
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
