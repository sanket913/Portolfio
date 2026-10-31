import { projects } from '@/lib/content';
import { ProjectPage } from '@/components/Experience';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);return {title:p?.title,description:p?.description}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!projects.some(x=>x.slug===slug))notFound();return <ProjectPage slug={slug}/>}
