import type { SiteConfig } from '../../packages/site/src/types';

const config = {
  id: 'kingsway',
  name: 'Kingsway Oak Flooring',
  shortName: 'Kingsway Oak',
  tagline: 'The quiet character of a well-chosen floor.',
  description: 'An architectural approach to hardwood and engineered flooring. Explore natural materials, thoughtful proportions, and flooring possibilities for homes in Etobicoke and the GTA.',
  areaSummary: 'Etobicoke, Toronto & the surrounding GTA',
  areas: ['Etobicoke', 'The Kingsway', 'Toronto', 'Mississauga', 'Bloor West Village', 'Humber Valley Village'],
  about: {
    title: 'A room begins with its material palette.',
    intro: 'The floor is the largest material surface in many homes. Its tone, grain, and proportions shape everything placed around it.',
    paragraphs: [
      'Kingsway Oak Flooring is presented around an interest in natural wood and considered interiors. This website is a place to explore hardwood and engineered flooring before discussing the practical requirements of your home.',
      'A thoughtful flooring decision brings aesthetics and construction together: board width, finish, natural variation, subfloor conditions, and the transitions between rooms. These details belong in the conversation from the beginning.',
      'The owner will confirm the final service offering, business background, project portfolio, and operating details before publication. No unverified credentials, team biographies, or customer endorsements are presented here.',
    ],
    principles: [
      { title: 'Material first', text: 'Look at real samples in the light of your home. Natural wood changes character across the day.' },
      { title: 'Proportion matters', text: 'Consider board width, direction, thresholds, and how a floor connects adjoining rooms.' },
      { title: 'A clear specification', text: 'Agree the product, preparation, finish details, and scope before making a commitment.' },
    ],
  },
  services: [
    { slug: 'hardwood-flooring', title: 'Solid hardwood', short: 'Natural grain. Lasting character. A material with individuality.', description: 'Solid hardwood offers a continuous natural wood construction and the variation that comes with it. Species, grade, board width, and finish all influence the appearance. Suitability depends on the space, substrate, humidity, and manufacturer’s installation requirements.', suitableFor: ['Above-grade living spaces with suitable conditions', 'Homeowners drawn to natural timber variation', 'Projects considering future refinishing potential'], considerations: ['Review actual samples rather than relying on screen colours.', 'Discuss acclimation and seasonal movement.', 'Confirm the finish and recommended maintenance.'], verified: false },
    { slug: 'engineered-oak', title: 'Engineered oak', short: 'The expression of real oak, in a layered construction.', description: 'Engineered oak pairs a natural oak surface with a layered core. It offers a broad choice of widths, finishes, and installation systems, with performance determined by the individual product. The right specification balances the desired appearance with your building’s requirements.', suitableFor: ['Homes seeking a natural oak surface', 'Wider-board designs where the product is suitable', 'Condominiums with approved acoustic assemblies'], considerations: ['Compare wear-layer thickness and product construction.', 'Obtain building approval where required.', 'Confirm compatibility with underfloor heating before purchase.'], verified: false },
    { slug: 'floor-replacement', title: 'Considered replacement', short: 'A connected plan for removal, preparation, and a new finish.', description: 'A flooring replacement is an opportunity to consider the whole room, from door clearances to the line of a threshold. Start by assessing the existing floor, planning any necessary removal, and defining the preparation needed for the selected material.', suitableFor: ['Interior renovations with a new material direction', 'Homes coordinating flooring across several rooms', 'Projects replacing tired or unsuitable surfaces'], considerations: ['Assess existing materials before planning removal.', 'Agree transitions and skirting details.', 'Allow for additional preparation revealed during removal.'], verified: false },
  ],
  faqs: [
    { question: 'What is the difference between solid and engineered wood?', answer: 'Solid boards are wood throughout. Engineered boards have a real wood surface over a layered core. Both need appropriate site conditions; construction, wear layer, and manufacturer guidance determine suitability.' },
    { question: 'How should I compare oak finishes?', answer: 'View a physical sample in your room during daylight and in the evening. Compare the tone with cabinetry, walls, and furnishings, and ask how the finish should be maintained.' },
    { question: 'Can wood flooring work in a condominium?', answer: 'It may, subject to the building’s rules, acoustic requirements, subfloor, and selected product. Obtain the required approvals and confirm the complete installation assembly before proceeding.' },
    { question: 'Do you have a completed project portfolio?', answer: 'Verified company projects have not yet been supplied. Current images are clearly labelled AI-generated interior concepts and do not represent Kingsway Oak installations.' },
    { question: 'What should I include in an enquiry?', answer: 'Share your location, approximate room size, current floor, preferred material, and any building restrictions. You can enquire before choosing a product; availability and scope will need confirmation.' },
  ],
  process: [
    { title: 'Contact', text: 'Introduce your space, your location, and the materials that interest you.' },
    { title: 'Estimate', text: 'Discuss suitability and confirm the proposed material and project scope.' },
    { title: 'Installation', text: 'Plan preparation, access, and the sequence of the agreed work.' },
    { title: 'Final walkthrough', text: 'Review transitions, finish details, and the care your floor requires.' },
  ],
  gallery: [
    { image: '/images/hero.jpg', alt: 'Light-filled contemporary interior with a warm floor and considered furnishings', title: 'Light & proportion', caption: 'AI-generated interior concept, not a completed project.' },
    { image: '/images/room.jpg', alt: 'Quiet residential interior with natural materials and a visible finished floor', title: 'Natural connections', caption: 'AI-generated interior concept. Not a completed project.' },
    { image: '/images/detail.jpg', alt: 'A residential interior detail with a natural material palette', title: 'A closer look', caption: 'AI-generated interior concept. Actual species, products, and finishes vary.' },
  ],
  contactIntro: 'A few details about your space are enough to begin. Tell us what you are considering, and include your location so availability can be confirmed.',
  seo: { title: 'Kingsway Oak Flooring | Hardwood & Engineered Wood', description: 'Explore hardwood and engineered oak flooring for homes in Etobicoke, Toronto, and the GTA. Discover material considerations and request a project estimate.' },
} satisfies SiteConfig;

export default config;
