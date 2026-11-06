import type { MetadataRoute } from 'next';
import config from '../site.config';
import { pathsFor } from '../../../packages/site/src/pages';
import { getBusinessSettings } from '../../../packages/site/src/business';
export const dynamic = 'force-dynamic';
export default function sitemap(): MetadataRoute.Sitemap { const b=getBusinessSettings(); if(!b.siteUrl || !b.published) return []; return [{url:b.siteUrl+'/'},...pathsFor(config).map(({slug})=>({url:b.siteUrl+'/'+slug.join('/')}))]; }
