import type { SiteConfig } from '../../packages/site/src/types';

const config = {
  id: 'montgomery',
  name: 'Montgomery Vinyl Flooring & Restoration',
  shortName: 'Montgomery',
  tagline: 'A thoughtful next chapter for your floors.',
  description: 'Explore vinyl flooring and restoration options for your home. A considered approach to replacing what is worn and understanding what can be renewed.',
  areaSummary: 'Etobicoke, Toronto, Mississauga & surrounding GTA communities',
  areas: ['Etobicoke', 'Toronto', 'Mississauga', 'Surrounding GTA communities'],
  about: {
    title: 'Look at what is possible, before starting again.',
    intro: 'Some rooms need a new beginning. Others have a floor worth keeping. Montgomery is a flooring and restoration brand focused on helping homeowners consider both paths.',
    paragraphs: [
      'The first useful question is not always which new floor to buy. It may be whether the existing floor can be repaired, what is causing the wear, or how a new surface will work with the rest of the home.',
      'This website outlines proposed vinyl installation and floor restoration services. The owner must confirm exact service capabilities, coverage and operating details before work is booked. The interior imagery is AI-generated inspiration, not a record of Montgomery installations.',
    ],
    principles: [
      { title: 'Respect the home', text: 'Plan access, protection and preparation before work begins, with the household’s routine in mind.' },
      { title: 'Understand the floor', text: 'Material, construction and condition determine whether restoration or replacement is appropriate.' },
      { title: 'Be clear about the details', text: 'Agree on the proposed work, exclusions and care requirements before committing to a project.' },
    ],
  },
  services: [
    { slug: 'vinyl-flooring-installation', title: 'Vinyl flooring installation', short: 'A practical new floor, with the warmth and character your room needs.', description: 'Explore luxury vinyl plank and tile options suited to the room and the way it is used. A sound, flat substrate and a suitable product are essential parts of a lasting installation. The precise installation method should follow the chosen manufacturer’s guidance.', suitableFor: ['Living spaces and hallways', 'Kitchens with a suitable product specification', 'Basement renovations after moisture assessment'], considerations: ['Water-resistant flooring does not repair leaks or underlying dampness.', 'Subfloor preparation and transitions should be included in the scope.', 'Confirm wear layer, finish and care requirements before choosing a product.'], verified: false },
    { slug: 'flooring-restoration', title: 'Flooring restoration', short: 'Understand what can be renewed before deciding to replace it.', description: 'A restoration assessment considers the existing material, wear, previous finishes and the cause of any damage. Some floors may be candidates for repair or refinishing; others need replacement. Suitable techniques and the extent of work must be confirmed after inspection.', suitableFor: ['Worn floors needing a condition assessment', 'Homeowners weighing repair against replacement', 'Rooms where retaining an existing material matters'], considerations: ['Vinyl and laminate cannot be sanded like solid wood.', 'Engineered wood suitability depends on the remaining wear layer.', 'No restoration outcome can be promised before inspecting the floor.'], verified: false },
    { slug: 'floor-repair-assessment', title: 'Floor repair assessment', short: 'A closer look at the problem, and a practical way forward.', description: 'Isolated damage, movement or gaps may have different causes. An assessment should identify the flooring type, investigate accessible conditions and explain whether local repair is practical. Matching existing materials or finishes is not always possible.', suitableFor: ['Localized wear or damage', 'Questions about movement, gaps or uneven areas', 'Planning a repair before a wider renovation'], considerations: ['Some defects indicate moisture or structural issues requiring a specialist.', 'Spare material and product availability can determine repair options.', 'The proposed service is an assessment, not a guarantee of repairability.'], verified: false },
    { slug: 'floor-removal-replacement', title: 'Floor removal & replacement', short: 'When it is time for a new floor, plan every layer.', description: 'A replacement project should account for the existing floor, removal method, disposal, substrate preparation and installation. Understanding these stages helps avoid comparing material-only prices with complete project estimates.', suitableFor: ['Worn floors that cannot be restored', 'Updating several connected rooms', 'Renovations requiring a change of flooring material'], considerations: ['Older flooring and adhesives may need hazardous-material assessment before removal.', 'Hidden substrate issues can affect the final price and schedule.', 'Confirm furniture moving, disposal and finishing details in writing.'], verified: false },
  ],
  faqs: [
    { question: 'Should I restore my floor or replace it?', answer: 'That depends on the material, construction and condition. A floor with cosmetic wear may have different options from one affected by moisture or structural movement. An assessment is the best starting point.' },
    { question: 'Can vinyl flooring be restored?', answer: 'Some surface care or local repairs may be possible, depending on the product and damage. Vinyl cannot be sanded and refinished like solid wood. Severely worn or damaged planks may need replacement.' },
    { question: 'Is vinyl a good option for a basement?', answer: 'It can be, but the condition of the basement matters. Resolve water entry or moisture issues first, then select a product and installation system approved for the substrate and location.' },
    { question: 'How do I prepare for an estimate?', answer: 'Share your location, approximate room dimensions, existing floor type and what you would like to change. Mention any moisture issues, damaged areas and access restrictions.' },
    { question: 'How long will the work take?', answer: 'Timing depends on the rooms, preparation, product and scope. Removal, substrate repairs and drying or acclimation requirements can all add time. Agree on a schedule after the assessment.' },
    { question: 'Are the gallery photographs Montgomery projects?', answer: 'No. They are clearly labelled AI-generated interior concepts for inspiration. Authentic completed projects and before-and-after photographs will be added only with owner verification and client permission.' },
  ],
  process: [
    { title: 'Contact', text: 'Tell us about your home and what you would like your floor to do better.' },
    { title: 'Estimate', text: 'Review the condition, material options and proposed scope before deciding.' },
    { title: 'Installation', text: 'Confirm preparation, protection and scheduling for the agreed work.' },
    { title: 'Final walkthrough', text: 'Review the details and understand how to care for the finished floor.' },
  ],
  gallery: [
    { image: '/images/hero.jpg', alt: 'Welcoming residential interior used as flooring inspiration', title: 'A welcoming foundation', caption: 'AI-generated interior concept. Not a completed project.' },
    { image: '/images/detail.jpg', alt: 'Interior detail illustrating warm residential materials', title: 'Thoughtful details', caption: 'AI-generated interior concept. No restoration result is implied.' },
    { image: '/images/room.jpg', alt: 'Residential room showing a calm, neutral interior palette', title: 'Room for a new chapter', caption: 'AI-generated interior concept. Not a completed project.' },
  ],
  contactIntro: 'Whether you are considering a new vinyl floor or wondering if an existing floor can be renewed, tell us a little about your home. The next step begins with understanding what is there.',
  seo: { title: 'Montgomery | Vinyl Flooring & Restoration in the GTA', description: 'Explore proposed vinyl flooring, floor restoration and replacement services for Etobicoke, Toronto, Mississauga and the GTA. Start with a thoughtful assessment.' },
} satisfies SiteConfig;

export default config;
