"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { drugs } from "@/data/drugs";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/entries", label: "Index" },
  { href: "/games/solitaire", label: "Solitaire" },
  { href: "/games/poker", label: "Poker" },
  { href: "/trends", label: "Trends" },
  { href: "/tools", label: "Tools" },
  { href: "/history", label: "History" },
];

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Reading localStorage has to happen after mount (it doesn't exist on the
    // server), so this intentionally sets state once on first render.
    const saved = window.localStorage.getItem("alpharbet-theme");
    const initial = saved === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("alpharbet-theme", next);
  }

  const results = query.trim()
    ? drugs.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()))
    : drugs;

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo">
          al<span className="phar-gradient">PHAR</span>bet
        </Link>
        <nav className="site-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="site-actions">
          <button type="button" className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            ⌕
          </button>
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "☾" : "☀"}
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              type="text"
              className="search-panel-input"
              placeholder="Search the index…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-panel-results">
              {results.length > 0 ? (
                <ul>
                  {results.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/entries/${d.slug}`} onClick={() => setSearchOpen(false)}>
                        <span className="search-result-name">{d.name}</span>
                        <span className="search-result-class mono">{d.drugClass}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="search-panel-empty mono">No matches yet — try another spelling.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
