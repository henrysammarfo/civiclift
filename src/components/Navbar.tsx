import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className={`inline-flex items-center gap-1 rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="group relative w-9 h-9 rounded-full p-[2px] flex-shrink-0"
          style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)" }}
        >
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg text-[13px] font-display italic tracking-tighter text-text transition-transform duration-200 group-hover:scale-110">
            CL
          </span>
        </a>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs sm:text-sm text-muted rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors hover:text-text hover:bg-stroke/50"
          >
            {link.label}
          </a>
        ))}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* CTA */}
        <a
          href="https://t.me/CivicLiftBot"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-xs sm:text-sm text-text rounded-full px-3 sm:px-4 py-1.5 sm:py-2 overflow-hidden"
        >
          <span
            className="absolute inset-0 -m-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)" }}
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 py-1.5">
            Try on Telegram ↗
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
