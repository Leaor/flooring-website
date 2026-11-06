'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from './navigation';

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); }
    }
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <>
    <nav className="desktop-nav" aria-label="Main navigation">
      {navigation.slice(0, 4).map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
    </nav>
    <button ref={button} className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
      {[['Home','/'], ...navigation, ['Request a free estimate', '/contact']].map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>}
  </>;
}
