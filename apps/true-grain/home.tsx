import { Arrow } from '../../packages/site/src/Arrow';
import Image from 'next/image';
import Link from 'next/link';
import config from './site.config';

export default function Home() {
  return (
    <div className="true-grain-home">
      <section className="tg-hero" aria-labelledby="tg-title">
        <Image src="/images/hero.jpg" alt="A finished residential interior with a warm, natural material palette" fill priority sizes="100vw" className="tg-hero-image" />
        <div className="tg-hero-shade" />
        <div className="container tg-hero-content">
          <p className="eyebrow">Toronto & the Greater Toronto Area</p>
          <h1 id="tg-title">Flooring for<br />GTA living.</h1>
          <p className="tg-hero-description">Hardwood, laminate & vinyl flooring.<br />A solid starting point for your home.</p>
          <div className="tg-hero-actions"><Link href="/contact" className="button">Request a free estimate <Arrow /></Link><Link href="/services" className="tg-plain-link">Find your floor <span aria-hidden="true">↓</span></Link></div>
        </div>
        <div className="container tg-hero-bottom"><span>Built around the way you live.</span><span>AI-generated interior concept</span></div>
      </section>

      <section className="tg-intro container" aria-labelledby="tg-intro-title">
        <p className="eyebrow">The right foundation</p>
        <div><h2 id="tg-intro-title">Looks good.<br /><span>Lives even better.</span></h2><p>Morning coffee. Muddy boots. The chair that always gets moved. Your floor is part of all of it. Start with a material that makes sense for your space, then make it your own.</p><Link href="/about" className="text-link">Meet True Grain <Arrow /></Link></div>
      </section>

      <section className="tg-materials" aria-labelledby="tg-materials-title"><div className="container">
        <div className="tg-section-top"><div><p className="eyebrow">Material matters</p><h2 id="tg-materials-title">Find your footing.</h2></div><p>Different rooms. Different routines.<br />A floor that fits both.</p></div>
        <div className="tg-material-grid">{config.services.slice(0, 3).map((service, i) => <Link href={`/services/${service.slug}`} className={`tg-material-card tg-material-${i}`} key={service.slug}><span className="tg-card-number">0{i + 1}</span><div className="tg-swatch" aria-hidden="true" /><h3>{service.title}</h3><p>{service.short}</p><span className="tg-card-link">Explore the material <Arrow /></span></Link>)}</div>
        <div className="tg-service-note"><p>Proposed services. Final availability and scope require owner confirmation.</p><Link href="/services" className="text-link">All flooring services <span aria-hidden="true">→</span></Link></div>
      </div></section>

      <section className="tg-gallery container" aria-labelledby="tg-gallery-title">
        <div className="tg-gallery-heading"><p className="eyebrow">The bigger picture</p><h2 id="tg-gallery-title">Start with<br />a little inspiration.</h2><p>Explore the tones, textures and everyday spaces that help a house feel like yours.</p><Link href="/projects" className="text-link">Explore the gallery <Arrow /></Link><small>AI-generated interior concepts.<br />Not True Grain client projects.</small></div>
        <figure className="tg-gallery-large"><div className="tg-gallery-image"><Image src="/images/room.jpg" alt="Residential room offering inspiration for a neutral flooring palette" fill sizes="(max-width: 700px) 100vw, 48vw" /></div><figcaption><span>01 / Room to live</span><span>Interior inspiration</span></figcaption></figure>
        <figure className="tg-gallery-small"><div className="tg-gallery-image"><Image src="/images/detail.jpg" alt="An interior material detail for flooring inspiration" fill sizes="(max-width: 700px) 100vw, 24vw" /></div><figcaption>02 / A closer look</figcaption></figure>
      </section>

      <section className="tg-process" aria-labelledby="tg-process-title"><div className="container"><div className="tg-section-top"><div><p className="eyebrow">No guesswork</p><h2 id="tg-process-title">One clear step at a time.</h2></div><p>A proposed project process.<br />Confirm the details before work begins.</p></div><ol className="tg-process-grid">{config.process.map((step, i) => <li key={step.title}><span className="tg-step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

      <section className="tg-areas container" aria-labelledby="tg-areas-title"><div><p className="eyebrow">Closer to home</p><h2 id="tg-areas-title">Toronto.<br />And the places<br /><span>around it.</span></h2></div><div className="tg-area-list">{config.areas.map((area, i) => <Link href="/service-areas" key={area}><span className="tg-area-number">0{i + 1}</span><span>{area}</span><Arrow /></Link>)}<p>Proposed service area. Share your location to confirm availability.</p></div></section>

      <section className="tg-faq container" aria-labelledby="tg-faq-title"><div><p className="eyebrow">Good questions</p><h2 id="tg-faq-title">Before you<br />take the next step.</h2><Link href="/faq" className="text-link">All flooring questions <Arrow /></Link></div><div>{config.faqs.slice(0, 4).map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="tg-final" aria-labelledby="tg-final-title"><div className="container"><p className="eyebrow">Your place. Your next step.</p><h2 id="tg-final-title">Let’s talk floors.</h2><div className="tg-final-bottom"><p>Tell us what you have in mind.<br />A simple conversation is a good place to start.</p><Link href="/contact" className="button">Request a free estimate <Arrow /></Link></div></div></section>
    </div>
  );
}
