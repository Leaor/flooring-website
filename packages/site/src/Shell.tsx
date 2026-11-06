import { Arrow } from './Arrow';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SiteConfig } from './types';
import { getBusinessSettings } from './business';
import { Navigation } from './Navigation';
import { navigation } from './navigation';

export function Shell({ config, children }: { config: SiteConfig; children: ReactNode }) {
  const business = getBusinessSettings();
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="top-bar"><div className="container"><span>{config.areaSummary}</span><span className={business.phone ? 'topbar-phone' : undefined}>{business.phone ? <a href={`tel:${business.phone.replace(/[^+\d]/g, '')}`} aria-label={`Call ${config.shortName} at ${business.phone}`}>{business.phone}</a> : <Link href="/contact">Let’s talk about your floors <Arrow /></Link>}</span></div></div>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-link" href="/" aria-label={`${config.name} home`}><img className="brand-logo" src="/brand/logo.jpg" alt={config.name} width={264} height={150} /></Link>
        <Navigation />
        <div className="header-actions"><Link className="button" href="/contact">Free estimate <Arrow /></Link></div>
      </div>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><img src="/brand/logo.jpg" alt={config.name} width={264} height={150} /><p>{config.tagline}</p><p className="footer-area">{config.areaSummary}</p></div>
        <div><h2>Explore</h2><nav aria-label="Footer navigation">{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div>
        <div><h2>Flooring</h2><nav aria-label="Flooring services">{config.services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}</nav></div>
        <div><h2>Plan your project</h2><Link className="footer-cta" href="/contact">Request a free estimate <Arrow /></Link>{business.phone && <a href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}>{business.phone}</a>}{business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}{business.address && <p>{business.address}</p>}<p>Tell us what you have in mind. We’ll help you identify the next step.</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {config.name}</span><Link href="/privacy">Privacy policy</Link></div>
    </footer>
  </>;
}
