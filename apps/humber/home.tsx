import Image from 'next/image';
import Link from 'next/link';
import config from './site.config';
import { Arrow } from '../../packages/site/src/Arrow';

export default function HumberHome() {
  return (
    <div className="humber-home">
      <section className="humber-hero">
        <div className="humber-hero-copy">
          <p className="eyebrow">ETOBICOKE & THE GREATER TORONTO AREA</p>
          <h1>Flooring for<br /><em>Etobicoke homes.</em></h1>
          <p className="humber-hero-description">Hardwood, engineered wood, vinyl, and laminate flooring for the rooms where life happens.</p>
          <div className="humber-hero-actions">
            <Link className="button" href="/contact">Request a Free Estimate <span aria-hidden="true"><Arrow /></span></Link>
            <Link className="text-link" href="/services">Explore flooring options <span aria-hidden="true">→</span></Link>
          </div>
          <p className="humber-hero-footnote">Your home. Your plans. A thoughtful place to begin.</p>
        </div>
        <figure className="humber-hero-figure">
          <div className="humber-hero-photo"><Image src="/images/hero.jpg" alt="Warm, light-filled residential interior with a beautifully finished floor" fill priority sizes="(max-width: 800px) 100vw, 53vw" /></div>
          <figcaption><span>ROOMS TO FEEL AT HOME IN</span><span>AI-generated interior concept. Not a completed project.</span></figcaption>
        </figure>
      </section>

      <div className="humber-material-bar" aria-label="Flooring materials"><span>Natural hardwood</span><span>Engineered wood</span><span>Luxury vinyl</span><span>Laminate</span></div>

      <section className="container humber-intro">
        <div><p className="eyebrow">THOUGHTFUL CHOICES, FROM THE GROUND UP</p><h2>The foundation of<br />a home well lived.</h2></div>
        <div className="humber-intro-copy"><p>A floor does more than bring a room together. It welcomes muddy boots, quiet mornings, family dinners, and all the small moments in between.</p><p>Explore materials that suit the way you live, with practical guidance on what to consider before your project begins.</p><Link href="/about" className="text-link">Get to know Humber Flooring <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="humber-services">
        <div className="container">
          <div className="humber-section-top"><div><p className="eyebrow">FLOORING, CONSIDERED</p><h2>Find the right fit<br />for your home.</h2></div><p>Different rooms. Different routines.<br />Start with the material that makes sense for you.</p></div>
          <div className="humber-service-grid">{config.services.map((service, index) => <Link href={`/services/${service.slug}`} className="humber-service" key={service.slug}><span className="humber-service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.short}</p><span className="humber-service-link">Explore this option <span aria-hidden="true"><Arrow /></span></span></Link>)}</div>
          <p className="humber-proposed-note">Proposed service range. Availability and the right approach for your home will be confirmed before work is agreed.</p>
        </div>
      </section>

      <section className="container humber-inspiration">
        <div className="humber-section-top"><div><p className="eyebrow">A LITTLE INSPIRATION</p><h2>Picture the possibilities.</h2></div><Link href="/projects" className="text-link">Explore the gallery <span aria-hidden="true">→</span></Link></div>
        <div className="humber-gallery-grid">
          <figure><div className="humber-gallery-photo humber-gallery-main"><Image src="/images/room.jpg" alt="Comfortable residential room with a warm, natural material palette" fill sizes="(max-width: 700px) 100vw, 60vw" /></div><figcaption><span>01 — A WARM WELCOME</span><span>AI-generated interior concept</span></figcaption></figure>
          <figure><div className="humber-gallery-photo humber-gallery-detail"><Image src="/images/detail.jpg" alt="Close view of an interior finished with natural-looking materials" fill sizes="(max-width: 700px) 100vw, 35vw" /></div><figcaption><span>02 — THE FINISHING TOUCH</span><span>AI-generated interior concept</span></figcaption></figure>
        </div>
        <p className="humber-gallery-note">These AI-generated interior concepts are inspiration, not completed Humber projects. Our gallery is ready for verified project photographs.</p>
      </section>

      <section className="humber-process"><div className="container"><p className="eyebrow">A CLEAR PATH FORWARD</p><h2>From your first idea<br />to the final detail.</h2><div className="humber-process-grid">{config.process.map((step, index) => <article key={step.title}><span className="humber-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="container humber-local"><div><p className="eyebrow">CLOSE TO HOME</p><h2>Start your project<br />in Etobicoke & beyond.</h2><p>Planning a room refresh or a larger renovation? Tell us where your home is, and we’ll confirm project availability in your neighbourhood.</p><Link href="/service-areas" className="text-link">View service area information <span aria-hidden="true">→</span></Link></div><div className="humber-area-list">{config.areas.map(area => <span key={area}>{area}<span aria-hidden="true"><Arrow /></span></span>)}<small>Proposed enquiry areas. Coverage is confirmed individually.</small></div></section>

      <section className="container humber-faq"><div><p className="eyebrow">BEFORE YOU BEGIN</p><h2>A few helpful answers.</h2><Link href="/faq" className="text-link">Read all frequently asked questions <span aria-hidden="true">→</span></Link></div><div className="humber-faq-list">{config.faqs.slice(0, 3).map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="humber-final"><div className="container"><p className="eyebrow">LET’S TALK ABOUT YOUR HOME</p><h2>A good floor starts<br />with a conversation.</h2><p>Tell us what you have in mind.<br />We’ll begin with the details that matter to you.</p><Link href="/contact" className="button">Request a Free Estimate <span aria-hidden="true"><Arrow /></span></Link></div><span className="humber-final-mark" aria-hidden="true">H</span></section>
    </div>
  );
}
