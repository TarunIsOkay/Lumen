"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Live demo" },
  { href: "#copilot", label: "AI Copilot" },
  { href: "#security", label: "Security" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // close drawer when hash link jumped
  useEffect(() => {
    if (!open) return;
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
              scrolled ? "glass-strong shadow-glass" : "border border-transparent",
            )}
          >
            <Link href="/" aria-label="Lumen home">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">
                  Start free <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="lumen-mobile-drawer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 active:scale-95 transition-transform"
              >
                <Menu className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer - fixed to viewport, outside header container */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="lumen-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-y-0 right-0 z-[61] flex w-[86vw] max-w-[360px] flex-col overflow-y-auto border-l border-border bg-surface p-5 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 active:scale-95 transition-transform"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-surface-2 active:bg-surface-2"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <div className="rounded-2xl border border-border bg-surface-2/50 p-4">
                  <p className="text-sm font-semibold text-ink">Ready to take control?</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">Explore the live demo or create a free account — no credit card, no tracking.</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="secondary" className="w-full h-11">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full h-11">
                      Start free
                    </Button>
                  </Link>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted">Free forever · Demo needs no account</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
