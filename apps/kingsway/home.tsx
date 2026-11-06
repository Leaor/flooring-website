import Image from 'next/image';
import Link from 'next/link';
import config from './site.config';
import { Arrow } from '../../packages/site/src/Arrow';

export default function KingswayHome() {
  return (
    <div className="kingsway-home">
      <section className="container kingsway-hero">
        <div className="kingsway-hero-top"><p className="eyebrow">HARDWOOD & ENGINEERED FLOORING<br />ETOBICOKE · TORONTO · GTA</p><p className="kingsway-hero-index">NATURAL MATERIALS.<br />CONSIDERED INTERIORS.</p></div>
        <div className="kingsway-hero-heading"><h1>Wood flooring.<br /><em>For homes in the GTA.</em></h1><Link href="/contact" className="kingsway-hero-cta">Request a{' '}<br />Free Estimate <span aria-hidden="true"><Arrow /></span></Link></div>
        <figure className="kingsway-hero-figure"><div className="kingsway-hero-image"><Image src="/images/hero.jpg" alt="Architectural residential interior with warm flooring and natural light" fill priority sizes="100vw" /></div><figcaption><span>THE MATERIALS THAT MAKE A ROOM</span><span>AI-generated interior concept. Not a completed project.</span></figcaption></figure>
      </section>

      <section className="container kingsway-intro"><p className="eyebrow">01 / OUR PERSPECTIVE</p><div><h2>Good design begins<br />with what’s <em>underfoot.</em></h2><div className="kingsway-intro-bottom"><p>The grain of oak. The way light moves across a room. A quiet connection between spaces. Explore wood flooring that belongs in the architecture of your home.</p><Link className="text-link" href="/about">The Kingsway approach <span aria-hidden="true"><Arrow /></span></Link></div></div></section>

      <section className="kingsway-materials"><div className="container kingsway-material-layout"><div className="kingsway-material-visual"><p className="eyebrow">02 / MATERIAL MATTERS</p><h2>Find your<br /><em>natural fit.</em></h2><div className="kingsway-detail-image"><Image src="/images/detail.jpg" alt="Residential material detail in a warm and restrained palette" fill sizes="(max-width: 760px) 100vw, 38vw" /></div><p className="kingsway-image-note">AI-generated interior concept. Not a completed project.</p></div><div className="kingsway-material-list"><p className="kingsway-material-intro">A selection of flooring possibilities.<br />Each with its own character. Each worth a closer look.</p>{config.services.map((service, index) => <Link key={service.slug} href={`/services/${service.slug}`} className="kingsway-material"><span className="kingsway-material-num">0{index + 1}</span><div><h3>{service.title}</h3><p>{service.short}</p></div><span className="kingsway-arrow" aria-hidden="true"><Arrow /></span></Link>)}<p className="kingsway-proposed-note">Proposed services, subject to owner confirmation and the requirements of your space.</p><Link href="/services" className="text-link">View all flooring options <span aria-hidden="true"><Arrow /></span></Link></div></div></section>

      <section className="container kingsway-gallery"><div className="kingsway-gallery-heading"><div><p className="eyebrow">03 / ROOMS & POSSIBILITIES</p><h2>A little inspiration.<br /><em>A different perspective.</em></h2></div><Link className="text-link" href="/projects">Explore the gallery <span aria-hidden="true"><Arrow /></span></Link></div><figure className="kingsway-gallery-feature"><div className="kingsway-room-image"><Image src="/images/room.jpg" alt="Refined home interior with a natural floor and complementary furnishings" fill sizes="(max-width: 760px) 100vw, 70vw" /></div><figcaption><span className="kingsway-gallery-label">N° 01</span><h3>Space to<br />feel at home.</h3><p>Natural materials create a conversation between the floor, the furniture, and the light.</p><span className="kingsway-image-note">AI-generated interior concept.<br />Not a completed company project.</span></figcaption></figure></section>

      <section className="kingsway-process"><div className="container"><div className="kingsway-process-heading"><p className="eyebrow">04 / FROM IDEA TO FINISH</p><h2>A thoughtful process.<br /><em>A clear next step.</em></h2></div><div className="kingsway-process-grid">{config.process.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>

      <section className="container kingsway-areas"><p className="eyebrow">05 / AROUND THE NEIGHBOURHOOD</p><div><h2>Rooted in the idea<br />of a <em>beautiful home.</em></h2><p>Planning a project in Etobicoke, Toronto, or the GTA? Share your location so availability can be confirmed.</p><div className="kingsway-area-tags">{config.areas.map(area => <span key={area}>{area}</span>)}</div><Link className="text-link" href="/service-areas">Enquiry areas & availability <span aria-hidden="true"><Arrow /></span></Link></div></section>

      <section className="container kingsway-questions"><div><p className="eyebrow">06 / THE FINER DETAILS</p><h2>Before you<br /><em>take the next step.</em></h2><Link className="text-link" href="/faq">All your questions <span aria-hidden="true"><Arrow /></span></Link></div><div className="kingsway-faq-list">{config.faqs.slice(0, 3).map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="kingsway-final"><div className="container"><p className="eyebrow">YOUR SPACE. YOUR STARTING POINT.</p><h2>Let’s find the floor<br />that feels like <em>you.</em></h2><div><p>Share a few details about your home.<br />A considered conversation starts here.</p><Link href="/contact" className="button">Request a Free Estimate <span aria-hidden="true"><Arrow /></span></Link></div></div></section>
    </div>
  );
}
