import type { MetadataRoute } from 'next';
import { profiles, projects } from '@/lib/content';
import { siteOrigin } from '@/lib/site-url';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteOrigin,priority:1},...profiles.map(p=>({url:`${siteOrigin}/profiles/${p.slug}/`,priority:.8})),...projects.map(p=>({url:`${siteOrigin}/projects/${p.slug}/`,priority:.6}))]}
