import type { SiteConfig } from '../../packages/site/src/types';

const config = {
  id: 'true-grain',
  name: 'True Grain Flooring',
  shortName: 'True Grain',
  tagline: 'Good floors. Everyday living.',
  description: 'Explore hardwood, laminate and vinyl flooring for homes in Toronto and the GTA. Start with the room, the way you live and the finish you want.',
  areaSummary: 'Toronto, Etobicoke, Mississauga & the GTA',
  areas: ['Toronto', 'Etobicoke', 'Mississauga', 'Greater Toronto Area'],
  about: {
    title: 'The floor is your starting point.',
    intro: 'A floor should look right and work hard. True Grain is a flooring brand built around a straightforward idea: choose materials for real life, not just the photograph.',
    paragraphs: [
      'A busy hallway, a quiet bedroom and a basement all ask different things of a floor. Moisture, sunlight, pets and the condition of the subfloor are useful starting points before choosing a colour or plank width.',
      'This website presents the proposed hardwood, laminate and vinyl services for True Grain. The owner must confirm the final service list, service area and operating details before bookings are available. The interior concepts shown here are AI-generated and are not represented as True Grain installations.',
    ],
    principles: [
      { title: 'Material first', text: 'Consider how the room is used, what is underneath the floor and what maintenance will be practical.' },
      { title: 'A clear scope', text: 'Discuss preparation, transitions, removal and installation together so the estimate reflects the whole job.' },
      { title: 'Details that matter', text: 'Edges, thresholds and the direction of the boards all contribute to a considered finish.' },
    ],
  },
  services: [
    { slug: 'hardwood-installation', title: 'Hardwood installation', short: 'Natural grain. Individual character. A material to live with.', description: 'Explore solid and engineered wood options, plank widths and finishes for your living spaces. A site assessment should establish subfloor condition, moisture levels and the installation method before a quotation is agreed.', suitableFor: ['Living rooms and bedrooms', 'Homeowners who prefer natural wood variation', 'Spaces with suitable humidity control'], considerations: ['Solid wood is not suitable for every below-grade room.', 'Acclimation and moisture testing depend on the product and site conditions.', 'Confirm the proposed installation method and trim work in the estimate.'], verified: false },
    { slug: 'laminate-installation', title: 'Laminate installation', short: 'A practical wood look for rooms with a lot going on.', description: 'Laminate offers a range of wood looks and surface textures. The right choice depends on the room, the product rating and how the space is maintained. Preparation and an appropriate underlay help support the finished floor.', suitableFor: ['Busy living spaces', 'Bedrooms and home offices', 'Projects with a defined material budget'], considerations: ['Water resistance varies by product; laminate is not automatically waterproof.', 'Flatness and expansion gaps must meet the manufacturer’s requirements.', 'Condo sound requirements should be checked before selecting an underlay.'], verified: false },
    { slug: 'vinyl-plank-installation', title: 'Luxury vinyl plank', short: 'Versatile finishes for everyday spills, footsteps and routines.', description: 'Luxury vinyl plank can suit many residential rooms, with wood-look finishes and a choice of installation systems. Product selection should account for subfloor preparation, direct sunlight, wear layer and any moisture concerns.', suitableFor: ['Kitchen and family-room updates', 'Basements after moisture assessment', 'Homeowners seeking low-maintenance finishes'], considerations: ['A water-resistant plank does not resolve water or moisture entering the building.', 'The substrate must be sound, clean and suitably flat.', 'Confirm product-specific cleaning and furniture protection guidance.'], verified: false },
    { slug: 'floor-removal-replacement', title: 'Removal & replacement', short: 'A considered reset, from the old floor to the final threshold.', description: 'Replacing a floor begins with understanding the existing material and what lies underneath it. Discuss removal, disposal, repairs and transitions as part of the project scope. Older materials may require specialist assessment before disturbance.', suitableFor: ['Updating a worn or dated floor', 'Coordinating finishes across adjoining rooms', 'Renovations that need removal and installation planned together'], considerations: ['Suspect hazardous materials require assessment by a qualified specialist.', 'Hidden subfloor damage can affect the final scope.', 'Furniture moving and waste removal should be confirmed explicitly.'], verified: false },
  ],
  faqs: [
    { question: 'Which floor makes sense for a busy household?', answer: 'Start with the room and your daily routine. Vinyl and laminate offer practical options, while wood brings natural variation. Compare product ratings, maintenance needs and site conditions before deciding.' },
    { question: 'Can new flooring go over my existing floor?', answer: 'Sometimes, depending on the product, existing surface and finished height. A stable, flat substrate and suitable clearances are essential. An assessment is needed before recommending an overlay.' },
    { question: 'What should I send with an estimate request?', answer: 'Your city, approximate room size, current floor type and preferred finish are helpful. Mention stairs, condo requirements, moisture concerns and any timing constraints.' },
    { question: 'Do you work in condos?', answer: 'Condo projects are part of the proposed service scope and must be confirmed. Building rules, sound transmission requirements, working hours and elevator bookings should be discussed before work is scheduled.' },
    { question: 'Are these photographs your completed projects?', answer: 'No. The images are AI-generated interior concepts used to explore materials and interiors. Verified True Grain project photographs can be added with permission as they become available.' },
  ],
  process: [
    { title: 'Contact', text: 'Tell us about your rooms, your location and the floor you have in mind.' },
    { title: 'Estimate', text: 'Discuss the material, site conditions and an itemized scope before deciding.' },
    { title: 'Installation', text: 'Once confirmed, agree on access, preparation and the installation schedule.' },
    { title: 'Final walkthrough', text: 'Review the finished details and the product’s care instructions together.' },
  ],
  gallery: [
    { image: '/images/hero.jpg', alt: 'Residential interior shown as flooring inspiration', title: 'Room to live', caption: 'AI-generated interior concept. Not a completed project.' },
    { image: '/images/detail.jpg', alt: 'Interior material detail illustrating a residential flooring palette', title: 'Texture underfoot', caption: 'AI-generated interior concept. Material and finish inspiration only.' },
    { image: '/images/room.jpg', alt: 'Finished living space with a neutral material palette', title: 'Everyday foundations', caption: 'AI-generated interior concept. Not a completed project.' },
  ],
  contactIntro: 'A room size, a few project details and your preferred material are a good place to start. You do not need to have every decision made.',
  seo: { title: 'True Grain Flooring | Hardwood, Laminate & Vinyl in Toronto', description: 'Explore proposed hardwood, laminate and luxury vinyl flooring services for Toronto, Etobicoke, Mississauga and the GTA. Plan your next flooring project.' },
} satisfies SiteConfig;

export default config;
