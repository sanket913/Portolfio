import { profiles } from '@/lib/content';
import { ProfilePage } from '@/components/Experience';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return profiles.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=profiles.find(x=>x.slug===slug);return {title:p?.name,description:p?.description}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!profiles.some(x=>x.slug===slug))notFound();return <ProfilePage slug={slug}/>}
