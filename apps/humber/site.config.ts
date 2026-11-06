import type { SiteConfig } from '../../packages/site/src/types';

const config = {
  id: 'humber',
  name: 'Humber Flooring Etobicoke',
  shortName: 'Humber Flooring',
  tagline: 'Good foundations for everyday living.',
  description: 'Explore flooring options for your Etobicoke home, from natural hardwood to practical vinyl and laminate. Start with your space, your plans, and a clear estimate request.',
  areaSummary: 'Etobicoke and surrounding GTA communities',
  areas: ['Etobicoke', 'Toronto', 'Mississauga', 'The Kingsway', 'Mimico', 'Long Branch'],
  about: {
    title: 'A considered approach to the floor beneath your feet.',
    intro: 'Your floor sets the tone for your home. The right choice should feel as comfortable on an ordinary Tuesday as it looks when friends come over.',
    paragraphs: [
      'Humber Flooring Etobicoke is being introduced with a straightforward idea: help homeowners make sense of their flooring choices. The materials, preparation, transitions, and installation plan all deserve attention before a project begins.',
      'Use this website to explore the proposed service range and prepare your questions. An estimate request is the starting point for confirming what is available, whether your area is covered, and what your particular home needs.',
      'Our company story, team information, qualifications, and confirmed operating details will be added once supplied by the owner. Until then, this website makes no claims about years in business, accreditations, or completed work.',
    ],
    principles: [
      { title: 'Start with the home', text: 'Think about the room, the subfloor, sunlight, and the way your household actually lives.' },
      { title: 'Understand the details', text: 'Ask what preparation, removal, transitions, and finishing are included in the proposed scope.' },
      { title: 'Choose with confidence', text: 'Compare practical care requirements alongside colour, grain, and the feel underfoot.' },
    ],
  },
  services: [
    { slug: 'hardwood-installation', title: 'Hardwood flooring', short: 'Natural character, warmth, and a floor that feels at home.', description: 'Solid hardwood brings the individual grain and texture of real timber into living rooms, bedrooms, and other suitable spaces. A project assessment should consider the existing subfloor, humidity, board direction, and transitions before an installation method is selected.', suitableFor: ['Living rooms and bedrooms above grade', 'Homeowners who value natural variation', 'Spaces with suitable humidity control'], considerations: ['Confirm subfloor condition and moisture readings.', 'Discuss species, finish, and everyday care.', 'Ask whether removal and trim work are included.'], verified: false },
    { slug: 'engineered-hardwood', title: 'Engineered hardwood', short: 'Real wood at the surface, with a versatile layered construction.', description: 'Engineered boards combine a real wood surface with a layered base. Product specifications and site conditions determine where and how they can be installed. Explore finishes, wear-layer options, and installation methods with your project requirements in mind.', suitableFor: ['Living areas where a real wood finish is desired', 'Renovations with product-specific height requirements', 'Suitable condos, subject to building rules'], considerations: ['Check acoustic and condominium requirements.', 'Confirm compatibility with any radiant heating.', 'Understand the selected product’s refinishing limits.'], verified: false },
    { slug: 'vinyl-and-laminate', title: 'Vinyl & laminate', short: 'Practical options for busy rooms and everyday routines.', description: 'Luxury vinyl and laminate offer different constructions, textures, and care requirements. Compare the exact product rather than treating all resilient flooring as interchangeable. A smooth, appropriately prepared subfloor remains essential to the finished result.', suitableFor: ['Busy households comparing practical floor options', 'Renovations with a defined material budget', 'Rooms approved by the selected manufacturer'], considerations: ['Water resistance varies by product and installation.', 'Ask about underlay and transitions.', 'Check manufacturer guidance for the intended room.'], verified: false },
    { slug: 'floor-replacement', title: 'Floor replacement', short: 'A fresh start, from the existing surface to the finishing details.', description: 'Replacing a floor starts with understanding what is already there. Your proposed scope should address removal, disposal, subfloor preparation, door clearances, transitions, and any trim work needed for a coherent finish.', suitableFor: ['Rooms with worn or unsuitable existing flooring', 'Renovations coordinating adjoining spaces', 'Homeowners comparing repair and replacement'], considerations: ['Older materials may need specialist assessment before removal.', 'Confirm furniture moving and disposal arrangements.', 'Allow for issues discovered beneath the existing floor.'], verified: false },
  ],
  faqs: [
    { question: 'Where should I start when choosing a new floor?', answer: 'Start with the room and how you use it. Note your existing flooring, approximate size, pets, moisture exposure, and the look you prefer. These details help narrow the options before you compare samples.' },
    { question: 'Can I request an estimate before choosing a material?', answer: 'Yes. Choose “Not sure yet” on the estimate form and describe your plans. Material recommendations, service availability, and pricing must be confirmed directly before any work is agreed.' },
    { question: 'Does the existing floor need to be removed?', answer: 'It depends on its condition, the subfloor, height differences, and the new product’s requirements. An assessment is needed; installing over an existing floor is not always appropriate.' },
    { question: 'Which neighbourhoods can I enquire about?', answer: 'Enquiries are welcome for Etobicoke, Toronto, Mississauga, and nearby communities. Include your location so coverage can be confirmed for your project.' },
    { question: 'Are the photographs completed Humber projects?', answer: 'No. The current images are AI-generated interior concepts used to help discuss styles. Verified project photography will be added when the owner provides images and permission to publish them.' },
  ],
  process: [
    { title: 'Contact', text: 'Tell us about your rooms, your location, and what you have in mind.' },
    { title: 'Estimate', text: 'Confirm availability, discuss materials, and agree a written scope.' },
    { title: 'Installation', text: 'Coordinate access, preparation, and an agreed installation schedule.' },
    { title: 'Final walkthrough', text: 'Review the finish together and discuss care for your chosen floor.' },
  ],
  gallery: [
    { image: '/images/hero.jpg', alt: 'Bright residential living room with a warm natural floor', title: 'Warmth in the everyday', caption: 'AI-generated interior concept. Not a completed project.' },
    { image: '/images/room.jpg', alt: 'Residential interior showing flooring alongside natural furnishings', title: 'Room to feel at home', caption: 'AI-generated interior concept. Not a completed company project.' },
    { image: '/images/detail.jpg', alt: 'Interior material detail showing the texture of a finished living space', title: 'The details underfoot', caption: 'AI-generated interior concept. Not a completed project. Actual products and finishes vary.' },
  ],
  contactIntro: 'Tell us a little about your home and the floor you have in mind. Include your area so project suitability and service availability can be confirmed.',
  seo: { title: 'Humber Flooring Etobicoke | Flooring for Your Home', description: 'Explore hardwood, engineered wood, vinyl, and laminate flooring ideas for Etobicoke and the GTA. Request an estimate and confirm your project requirements.' },
} satisfies SiteConfig;

export default config;
