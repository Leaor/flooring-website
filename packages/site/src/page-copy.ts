import type { SiteConfig } from './types';

export type PageSlug = 'about' | 'services' | 'projects' | 'service-areas' | 'faq' | 'contact' | 'privacy';
export type PageText = { title: string; heading: string; description: string };
export type ActionText = { eyebrow: string; heading: string; description: string; buttonLabel: string };
export type BrandPageCopy = Record<PageSlug, PageText> & { cta: ActionText };

export const pageCopy: Record<SiteConfig['id'], BrandPageCopy> = {
  humber: {
    about: {
      title: 'About Humber Flooring',
      heading: 'A considered foundation for your Etobicoke home.',
      description: 'Get to know the thinking behind Humber Flooring: useful guidance, natural materials and a clear conversation about the room you want to create.',
    },
    services: {
      title: 'Flooring services in Etobicoke',
      heading: 'The right material. A room that feels like home.',
      description: 'Consider wood, vinyl and laminate options for your next renovation. These proposed services are a starting point for discussing your home, budget and priorities.',
    },
    projects: {
      title: 'Residential flooring inspiration',
      heading: 'Quiet details. Lasting impressions.',
      description: 'A collection of interior concepts to help you think about tone, texture and the character of a room. Every image is AI-generated inspiration, not a Humber project photograph.',
    },
    'service-areas': {
      title: 'Etobicoke and GTA service enquiries',
      heading: 'Begin with your neighbourhood.',
      description: 'Planning a floor in Etobicoke or a nearby GTA community? Share the location and scope so the owner can confirm whether your project can be accommodated.',
    },
    faq: {
      title: 'Flooring planning questions',
      heading: 'Good decisions begin with clear answers.',
      description: 'Practical guidance on choosing a material, preparing your home and knowing what to ask before a flooring estimate.',
    },
    contact: {
      title: 'Request a Humber Flooring estimate',
      heading: 'Tell us about the room you have in mind.',
      description: 'A few details about your Etobicoke or GTA home will help start the conversation. Include the existing floor, the rooms involved and anything you would like to understand better.',
    },
    privacy: {
      title: 'Humber Flooring privacy policy',
      heading: 'A clear account of your information.',
      description: 'How information shared with Humber Flooring through this website is used for your enquiry, and the choices available to you.',
    },
    cta: {
      eyebrow: 'Your home, thoughtfully considered',
      heading: 'Let’s begin with your flooring plans.',
      description: 'Share a little about your rooms, your location and the finish you are considering.',
      buttonLabel: 'Request a free estimate',
    },
  },
  kingsway: {
    about: {
      title: 'About Kingsway Oak Flooring',
      heading: 'Material. Proportion. A sense of place.',
      description: 'Kingsway Oak approaches flooring as part of the whole interior. Explore the role of timber, plank dimensions and finish in shaping a considered home.',
    },
    services: {
      title: 'Hardwood and engineered flooring options',
      heading: 'A material language of your own.',
      description: 'Explore proposed wood flooring services, from solid hardwood to engineered construction. Suitability, installation method and service availability need confirmation for each space.',
    },
    projects: {
      title: 'Wood flooring and interior studies',
      heading: 'Studies in light, grain and proportion.',
      description: 'An editorial collection of AI-generated interior concepts. Use them to consider a palette or a board direction; they are not completed Kingsway Oak projects or product samples.',
    },
    'service-areas': {
      title: 'Toronto and GTA project enquiries',
      heading: 'A place for the conversation to begin.',
      description: 'From Toronto interiors to homes across the GTA, location and building requirements shape a project. Send your neighbourhood and a brief outline to confirm availability.',
    },
    faq: {
      title: 'Questions about wood flooring',
      heading: 'A closer reading of the details.',
      description: 'Understand wood construction, finish, installation considerations and the information that makes an estimate useful.',
    },
    contact: {
      title: 'Discuss a Kingsway Oak flooring project',
      heading: 'What are you imagining for your space?',
      description: 'Describe the room, the existing floor and the direction you are considering. A particular plank width or finish is helpful, but a clear starting point matters more than a finished specification.',
    },
    privacy: {
      title: 'Kingsway Oak privacy policy',
      heading: 'The information behind an enquiry.',
      description: 'An explanation of how Kingsway Oak Flooring uses the details you choose to share through this website.',
    },
    cta: {
      eyebrow: 'A considered starting point',
      heading: 'Bring your flooring ideas into focus.',
      description: 'Tell us about the architecture, the material and the atmosphere you have in mind.',
      buttonLabel: 'Request a free estimate',
    },
  },
  'true-grain': {
    about: {
      title: 'About True Grain Flooring',
      heading: 'The room comes first. The floor follows.',
      description: 'Busy hallways, quiet bedrooms, everyday living. True Grain starts with how you use your space and what you need from the material underfoot.',
    },
    services: {
      title: 'Hardwood, laminate and vinyl flooring',
      heading: 'Choose the floor that fits real life.',
      description: 'Compare the proposed hardwood, laminate, vinyl and replacement options. Each has a different role; confirm the product, site conditions and service scope before committing.',
    },
    projects: {
      title: 'Flooring material and room inspiration',
      heading: 'See the material. Picture the room.',
      description: 'Flooring ideas without the sales pitch. These AI-generated room concepts explore colour and texture; none is a completed True Grain installation.',
    },
    'service-areas': {
      title: 'Toronto, Etobicoke and GTA enquiries',
      heading: 'Where is your next project?',
      description: 'Toronto, Etobicoke, Mississauga or elsewhere in the GTA: share the area and the job you have in mind. The owner needs to confirm coverage and scheduling.',
    },
    faq: {
      title: 'Straightforward flooring answers',
      heading: 'Know what you’re stepping into.',
      description: 'Direct answers about materials, existing floors and project preparation. Start here before making your shortlist.',
    },
    contact: {
      title: 'Request a True Grain flooring estimate',
      heading: 'Your rooms. Your plans. Let’s hear them.',
      description: 'Tell us where you are, what is on the floor now and what you want to change. Approximate measurements are useful. Having every answer is optional.',
    },
    privacy: {
      title: 'True Grain privacy policy',
      heading: 'Your details, explained plainly.',
      description: 'What happens to the information you submit to True Grain Flooring, what the website stores and how to ask about your enquiry.',
    },
    cta: {
      eyebrow: 'Ready for the next step?',
      heading: 'Let’s make a plan for your floor.',
      description: 'A room size, a location and a few practical details are enough to get started.',
      buttonLabel: 'Request a free estimate',
    },
  },
  montgomery: {
    about: {
      title: 'About Montgomery Flooring and Restoration',
      heading: 'A little care for the home you love.',
      description: 'Some floors need a new beginning. Others deserve a closer look. Montgomery brings renewal and replacement into the same thoughtful conversation.',
    },
    services: {
      title: 'Vinyl flooring and restoration options',
      heading: 'Understand what is there. Consider what comes next.',
      description: 'Explore proposed vinyl installation, floor restoration, repair assessment and replacement services. The condition and construction of your floor help determine the right next step.',
    },
    projects: {
      title: 'Residential flooring and restoration inspiration',
      heading: 'Room for another chapter.',
      description: 'Warm, welcoming interiors to help you imagine a different finish. These AI-generated concepts are inspiration only, not completed Montgomery work or before-and-after restoration evidence.',
    },
    'service-areas': {
      title: 'GTA flooring and restoration enquiries',
      heading: 'Start with the place you call home.',
      description: 'Share your Etobicoke, Toronto, Mississauga or GTA location when enquiring. The owner will need to confirm coverage, access and the proposed work before a visit is arranged.',
    },
    faq: {
      title: 'Vinyl flooring and restoration questions',
      heading: 'A few answers before a new beginning.',
      description: 'Helpful guidance on assessing an existing floor, considering vinyl and preparing for the first conversation about your home.',
    },
    contact: {
      title: 'Request a Montgomery flooring estimate',
      heading: 'What would you like your floor to become?',
      description: 'Whether you are considering replacement or wondering what can be renewed, start with a few details about your home and the floor you have today.',
    },
    privacy: {
      title: 'Montgomery privacy policy',
      heading: 'Care begins with clear information.',
      description: 'How Montgomery Vinyl Flooring & Restoration handles the details you share when asking about your home.',
    },
    cta: {
      eyebrow: 'The next chapter, considered',
      heading: 'Let’s see what is possible for your home.',
      description: 'A new surface, a careful assessment or a question about the floor you already have.',
      buttonLabel: 'Request a free estimate',
    },
  },
};
