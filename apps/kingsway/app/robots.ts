import type { MetadataRoute } from 'next';
import { getBusinessSettings } from '../../../packages/site/src/business';
export const dynamic = 'force-dynamic';
export default function robots(): MetadataRoute.Robots { const b=getBusinessSettings(); return b.published && b.siteUrl ? {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:b.siteUrl+'/sitemap.xml'} : {rules:{userAgent:'*',disallow:'/'}}; }
