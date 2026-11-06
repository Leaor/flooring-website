import { Arrow } from './Arrow';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { SiteConfig } from './types';
import { getBusinessSettings } from './business';
import { EstimateForm } from './EstimateForm';
import { pageCopy, type PageSlug } from './page-copy';

const standardPages = ['about', 'services', 'projects', 'service-areas', 'faq', 'contact', 'privacy'];
export function pathsFor(config: SiteConfig) {
  return [...standardPages.map(slug => ({ slug: [slug] })), ...config.services.map(service => ({ slug: ['services', service.slug] }))];
}
export function pageInfo(config: SiteConfig, slug: string[]) {
  if (slug.length === 2 && slug[0] === 'services') {
    const service = config.services.find(item => item.slug === slug[1]);
    return service ? { title: service.title, description: service.short, heading: service.title } : null;
  }
  if (slug.length !== 1) return null;
  return standardPages.includes(slug[0]) ? pageCopy[config.id][slug[0] as PageSlug] : null;
}
export function metadataFor(config:SiteConfig, slug:string[] = []): Metadata {
  const business = getBusinessSettings();
  const info = slug.length ? pageInfo(config, slug) : { title:config.seo.title, description:config.seo.description };
  if (!info) return { title:'Page not found', robots:{index:false,follow:false} };
  const url = business.siteUrl ? `${business.siteUrl}/${slug.join('/')}` : undefined;
  return {
    title: slug.length ? `${info.title} | ${config.shortName}` : info.title,
    description:info.description,
    ...(url ? { alternates:{canonical:url}, openGraph:{title:info.title,description:info.description,url,siteName:config.name,locale:'en_CA',type:'website',images:[{url:`${business.siteUrl}/images/hero.jpg`,width:1536,height:1024,alt:`Illustrative interior concept for ${config.name}`}]} } : {}),
    robots:{index:business.published,follow:business.published},
  };
}
export function StructuredData({config}:{config:SiteConfig}) {
  const business = getBusinessSettings();
  if (!business.published || !business.siteUrl) return null;
  const data = {'@context':'https://schema.org', '@type':business.address ? 'HomeAndConstructionBusiness' : 'Organization', name:config.name, url:business.siteUrl, logo:`${business.siteUrl}/brand/logo.jpg`, ...(business.phone?{telephone:business.phone}:{}), ...(business.email?{email:business.email}:{}), ...(business.address?{address:{'@type':'PostalAddress',streetAddress:business.address,addressCountry:'CA'}}:{})};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} />;
}
export function CallToAction({config}:{config:SiteConfig}) {
  const copy=pageCopy[config.id].cta;
  return <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">{copy.eyebrow}</span><h2>{copy.heading}</h2><p>{copy.description}</p></div><Link className="button" href="/contact">{copy.buttonLabel} <Arrow /></Link></div></section>;
}

function Faq({config}:{config:SiteConfig}) {
  return <div className="faq-list">{config.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>;
}
function Proposal({config}:{config:SiteConfig}) {
  return config.services.some(service=>!service.verified) ? <p className="proposal-note">The services below are proposed options. Availability, suitability, and the scope of work must be confirmed with {config.shortName} before booking.</p> : null;
}
export function ContentPage({config,slug}:{config:SiteConfig;slug:string[]}) {
  const info = pageInfo(config,slug);
  if (!info) notFound();
  const page = slug[0];
  const service = slug.length===2 ? config.services.find(item=>item.slug===slug[1]) : undefined;
  const business = getBusinessSettings();
  return <>
    <section className="page-heading"><div className="container"><nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{service && <><Link href="/services">Services</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{info.title}</span></nav><span className="eyebrow">{config.shortName}</span><h1>{info.heading}</h1><p className="lead">{info.description}</p></div></section>
    {page==='about' && <><section className="container content-section two-column"><div className="prose">{config.about.paragraphs.map(p=><p key={p}>{p}</p>)}<Link className="text-link" href="/contact">Tell us about your home <Arrow /></Link></div><figure><img className="editorial-image" src="/images/room.jpg" alt={config.gallery[1]?.alt || 'Illustrative residential interior'} width={1024} height={1280}/><figcaption className="image-caption">AI-generated interior concept. Not a completed project.</figcaption></figure></section><section className="container content-section"><span className="eyebrow">A thoughtful starting point</span><div className="principle-grid">{config.about.principles.map((item,index)=><div className="principle" key={item.title}><span className="eyebrow">0{index+1}</span><h2>{item.title}</h2><p>{item.text}</p></div>)}</div></section></>}
    {page==='services' && !service && <section className="container content-section"><Proposal config={config}/><div className="service-grid">{config.services.map(item=><article className="service-card" key={item.slug}><span className="eyebrow">{item.verified?'Flooring service':'Proposed service'}</span><h2>{item.title}</h2><p>{item.short}</p><Link className="text-link" href={`/services/${item.slug}`}>Explore {item.title.toLowerCase()} <Arrow /></Link></article>)}</div></section>}
    {service && <><section className="container content-section two-column"><div>{!service.verified && <p className="proposal-note">This is a proposed service. Confirm suitability, availability, and the scope of work with {config.shortName} before booking.</p>}<h2>What to consider</h2><p>{service.description}</p><h3 style={{marginTop:36}}>A useful option to discuss for</h3><ul className="detail-list">{service.suitableFor.map(item=><li key={item}>{item}</li>)}</ul></div><div><img className="editorial-image" style={{aspectRatio:'5/4'}} src="/images/detail.jpg" alt="AI-generated interior concept showing a finished floor" width={1250} height={1000}/><p className="image-caption">Illustrative concept, not a product sample or completed installation.</p><h3 style={{marginTop:30}}>Questions for your estimate</h3><ul className="detail-list">{service.considerations.map(item=><li key={item}>{item}</li>)}</ul></div></section><section className="container content-section"><h2>Explore other flooring options</h2><div className="service-grid">{config.services.filter(item=>item.slug!==service.slug).map(item=><Link className="service-card" key={item.slug} href={`/services/${item.slug}`}><h3>{item.title} <Arrow /></h3><p>{item.short}</p></Link>)}</div></section></>}
    {page==='projects' && <section className="container content-section"><p className="proposal-note">Every image in this gallery is an AI-generated interior concept. No image is presented as work completed by {config.shortName}. Actual project photographs and before-and-after stories will be added only with permission and verified project details.</p><div className="gallery-grid">{config.gallery.map(item=><figure key={item.title}><img src={item.image} alt={item.alt} width={1000} height={1250} loading="lazy"/><figcaption><h2>{item.title}</h2><p>{item.caption}</p></figcaption></figure>)}</div></section>}
    {page==='service-areas' && <section className="container content-section two-column"><div><h2>Include your neighbourhood.</h2><p>Every project starts with the home itself. Share your city or neighbourhood when you get in touch. Travel, scheduling, building access, and the type of work all affect availability.</p><p>These are areas for enquiries, not verified office locations or a promise of coverage. We do not list a showroom or business address unless confirmed by the owner.</p><Link href="/contact" className="text-link" style={{marginTop:24}}>Ask about your area <Arrow /></Link></div><ul className="area-list">{config.areas.map(area=><li key={area}>{area}</li>)}</ul></section>}
    {page==='faq' && <section className="container content-section"><Faq config={config}/><p style={{marginTop:30}}>Still have a question? <Link className="text-link" href="/contact">Get in touch <Arrow /></Link></p></section>}
    {page==='contact' && <section className="container content-section contact-layout"><aside className="contact-aside"><span className="eyebrow">A clear first step</span><h2>Good plans start with a conversation.</h2><p>Share the rooms you’re thinking about, your location, and any practical questions. You don’t need to have every decision made.</p>{business.phone && <p><a href={`tel:${business.phone.replace(/[^+\d]/g,'')}`}>{business.phone}</a></p>}{business.email && <p><a href={`mailto:${business.email}`}>{business.email}</a></p>}{!business.phone && !business.email && <p>Direct contact details are being confirmed. No phone number or email address is published yet.</p>}<p>Service availability and any estimate arrangements must be confirmed before work is booked.</p><Link href="/faq">Read common questions</Link></aside><EstimateForm config={config} deliveryAvailable={business.deliveryAvailable}/></section>}
    {page==='privacy' && <section className="container content-section"><div className="prose" style={{maxWidth:850}}><h2>Information you choose to share</h2><p>When enabled, the estimate form asks for your name, phone number, email address, city or area, project type, project details, and preferred contact method. Approximate square footage is optional. Please do not submit payment information, identity documents, or sensitive personal information.</p><h2>How estimate requests are used</h2><p>{config.name} uses your request to discuss your flooring enquiry and respond using your preferred contact method. Submitting a request does not subscribe you to marketing. The form asks for your consent before sending your details.</p><h2>Email delivery and service providers</h2><p>When delivery is configured, your request is sent through Resend to the company’s designated receiving email account. The email provider and receiving mailbox process that information to deliver and retain the message. Their processing may take place outside Canada. The website does not create a separate customer database or store your form entries in browser storage.</p><h2>Security and retention</h2><p>The form uses server validation, spam checks, and limited request-rate information. Never send confidential information in project details. Requests should be kept only as long as needed to respond, manage an agreed project, or satisfy applicable recordkeeping obligations. Contact the company to ask about the retention of your particular enquiry.</p><h2>Cookies and external content</h2><p>This website does not include advertising trackers or analytics by default. Images and fonts are served locally. Hosting providers may process ordinary request information such as IP addresses to operate and protect the website.</p><h2>Questions, access, or correction</h2><p>Use the contact details on the <Link href="/contact">contact page</Link> to request access to, correction of, or deletion of information you have provided. If online requests are unavailable, no enquiry is sent through the form. The owner must confirm contact details and review this policy before accepting enquiries.</p></div></section>}
    {!['contact','privacy'].includes(page) && <CallToAction config={config}/>}
  </>;
}
