export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  suitableFor: string[];
  considerations: string[];
  verified: boolean;
};

export type SiteConfig = {
  id: 'humber' | 'kingsway' | 'true-grain' | 'montgomery';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  areaSummary: string;
  areas: string[];
  about: { title: string; intro: string; paragraphs: string[]; principles: {title: string; text: string}[] };
  services: Service[];
  faqs: {question: string; answer: string}[];
  process: {title: string; text: string}[];
  gallery: {image: string; alt: string; title: string; caption: string}[];
  contactIntro: string;
  seo: {title: string; description: string};
};
