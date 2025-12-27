"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projectsSubmenu = [
    { slug: "archive-x", title: "Archive X" },
    { slug: "southern-birds-project", title: "Southern Birds" },
    { slug: "i-was-naver", title: "I Was Never" },
    { slug: "the-bleed-zine", title: "The Bleed Zine" },
    { slug: "three-decades-and-a-climax", title: "Three Decades and A Climax" },
  ];

  const coCreationsSubmenu = [
    { slug: "shabah-el-rih", title: "Shabah El Rih" },
    { slug: "snakes-and-ladders", title: "Snakes and Ladders" },
    { slug: "msafreen", title: "Mehrak" },
    { slug: "jal-el-bahr", title: "Jal El Bahr" },
    { slug: "unhearable-voices", title: "Unhearable Voices" },
  ];

  const projectPaths = projectsSubmenu.map((item) => `/${item.slug}`);
  const coCreationPaths = coCreationsSubmenu.map((item) => `/${item.slug}`);
  const isProjectsActive = projectPaths.includes(pathname);
  const isCoCreationsActive = coCreationPaths.includes(pathname);
  const isPrintsActive = pathname === "/xprints" || pathname.startsWith("/xprints/");
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-[12px]">
      <div className="flex items-center justify-between px-[6vw] py-4 md:px-[4vw]">
        <Link
          href="/"
          className="font-display text-sm font-medium tracking-wide text-white transition hover:text-zinc-300"
        >
          Nader Bahsoun
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={`transition hover:text-white ${
                isActive("/") ? "text-white" : "text-zinc-400"
              }`}
            >
              Home
            </Link>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu("projects")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button
                className={`transition hover:text-white ${
                  isProjectsActive ? "text-white" : "text-zinc-400"
                }`}
              >
                Projects
              </button>
              {hoveredMenu === "projects" && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-56 border border-white/10 bg-black/90 backdrop-blur-[12px] py-2 shadow-xl">
                    {projectsSubmenu.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                        className={`block px-4 py-2 text-sm transition hover:bg-white/5 hover:text-white ${
                          isActive(`/${item.slug}`) ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Co-creations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu("co-creations")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button
                className={`transition hover:text-white ${
                  isCoCreationsActive ? "text-white" : "text-zinc-400"
                }`}
              >
                Co-creations
              </button>
              {hoveredMenu === "co-creations" && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-56 border border-white/10 bg-black/90 backdrop-blur-[12px] py-2 shadow-xl">
                    {coCreationsSubmenu.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                        className={`block px-4 py-2 text-sm transition hover:bg-white/5 hover:text-white ${
                          isActive(`/${item.slug}`) ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/xprints"
              aria-current={isPrintsActive ? "page" : undefined}
              className={`transition hover:text-white ${
                isPrintsActive ? "text-white" : "text-zinc-400"
              }`}
            >
              Prints
            </Link>
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`transition hover:text-white ${
                isActive("/about") ? "text-white" : "text-zinc-400"
              }`}
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/waysoffmadness"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-white"
              aria-label="Instagram"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.25-3.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="border border-white/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white transition hover:border-white"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-sm text-zinc-400 transition hover:text-white"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col gap-6 bg-black/95 px-6 py-8 text-sm text-zinc-400 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/"
                aria-current={isActive("/") ? "page" : undefined}
                className={`transition hover:text-white ${
                  isActive("/") ? "text-white" : "text-zinc-400"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div>
                <span
                  className={`block ${
                    isProjectsActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  Projects
                </span>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {projectsSubmenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                      className={`text-xs transition hover:text-white ${
                        isActive(`/${item.slug}`) ? "text-white" : "text-zinc-500"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <span
                  className={`block ${
                    isCoCreationsActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  Co-creations
                </span>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {coCreationsSubmenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      aria-current={isActive(`/${item.slug}`) ? "page" : undefined}
                      className={`text-xs transition hover:text-white ${
                        isActive(`/${item.slug}`) ? "text-white" : "text-zinc-500"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/xprints"
                aria-current={isPrintsActive ? "page" : undefined}
                className={`transition hover:text-white ${
                  isPrintsActive ? "text-white" : "text-zinc-400"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Prints
              </Link>
              <Link
                href="/about"
                aria-current={isActive("/about") ? "page" : undefined}
                className={`transition hover:text-white ${
                  isActive("/about") ? "text-white" : "text-zinc-400"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className={`transition hover:text-white ${
                  isActive("/contact") ? "text-white" : "text-zinc-400"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="https://instagram.com/waysoffmadness"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instagram
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
