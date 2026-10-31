'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Github, Linkedin, Copy, Check, Plus } from 'lucide-react';
import {ResumeActions,ResumeLibrary,DirectContact} from './Resumes';
import { Shell } from './AppShell';
import { profiles, projects, type Project } from '@/lib/content';
import { photoEvidence } from '@/lib/photo-content';
const github='https://github.com/sanket913';const linkedin='https://www.linkedin.com/in/sanket-prajapati27/';
function Eyebrow({number,children}:{number:string;children:React.ReactNode}){return <div className="eyebrow"><span>{number} /</span>{children}</div>}
function External({href,children}:{href:string;children:React.ReactNode}){return <a href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={15}/></a>}
export function ProjectArt({project}:{project:Project}){const evidence=photoEvidence[project.slug];if(evidence)return <figure className="project-art art-photo"><img src={`/images/personal/${evidence.image}`} alt={evidence.caption} loading="lazy"/><figcaption>{evidence.caption}</figcaption></figure>;return <div className={`project-art art-${project.visual}`} aria-label={`Concept illustration for ${project.title}; not an application screenshot`}><span className="art-label">VISUAL CONCEPT Â· NOT AN APPLICATION SCREENSHOT</span>{project.visual==='travel'?<><div className="travel-orbit"/><div className="mock-browser"><div className="browser-bar"><span>â— â— â—</span><small>routewise / explore</small><ArrowUpRight size={11}/></div><div className="mock-body"><span className="mock-logo">routewise<span>â†—</span></span><small>A LITTLE CURIOSITY. A NEW DIRECTION.</small><strong>Your next chapter<br/>starts somewhere.</strong><div className="mock-search">Where will curiosity take you? <span>Explore â†—</span></div><div className="landscape"><i/><i/><i/><span>THE WORLD IS STILL FULL OF FIRSTS.</span></div></div></div><span className="art-coordinate">22Â°18â€² N &nbsp; 73Â°11â€² E</span></>:project.visual==='data'?<><div className="chart-grid">{[36,57,42,72,53,84,68,95,77,110,93,131].map((h,i)=><i key={i} style={{height:`${h}px`}}/>)}</div><span className="data-art-title">Patterns.<br/>Possibilities.</span><div className="chart-axis">OBSERVATION â†’ INSIGHT</div></>:project.visual==='neural'?<><div className="neural-orb">{Array.from({length:8},(_,i)=><i key={i} style={{transform:`rotate(${i*22.5}deg)`}}/>)}</div><span className="neural-caption">context â†’ understanding</span></>:<><div className="commerce-orb"/><strong className="commerce-title">{project.visual==='events'?'Good things\nhappen together.':'Thoughtfully\nselected.'}</strong><span className="commerce-caption">{project.title} / INTERFACE STUDY</span></>}</div>}
function ProjectCard({project,index}:{project:Project;index:number}){return <Link data-reveal href={`/projects/${project.slug}/`} className="project-card"><ProjectArt project={project}/><div className="project-meta"><div><small>{String(index+1).padStart(2,'0')} / {project.category}</small><h3>{project.title}</h3></div><span className="circle-arrow"><ArrowUpRight size={22}/></span></div></Link>}
function RelevantExperience({slug}:{slug:string}){
 if(slug==='data-analytics')return <section className="section relevant-experience"><Eyebrow number="B">RELATED WORK</Eyebrow><h3>Data and analytics projects</h3><p>Explore salary prediction and multilingual sentiment analysis in the project gallery above.</p><p className="evidence-note">Project implementation details await source review.</p></section>;
 const development=slug==='full-stack';
 return <section className="section relevant-experience"><Eyebrow number="B">RELEVANT EXPERIENCE</Eyebrow><h3>{development?'Full-Stack Developer Intern · Mamo Technolabs LLP':'Machine Learning Intern · ByteXL'}</h3><p>{development?'December 2024 — March 2025':'May 2024 — August 2024'}</p><p className="evidence-note">Detailed responsibilities and contributions await confirmation.</p></section>;
}
export function Contact(){
 const [copied,setCopied]=useState(false);
 const [copyError,setCopyError]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 async function copy(){
  const email='sanket2742003@gmail.com';
  if(timer.current)clearTimeout(timer.current);
  try{
   await navigator.clipboard.writeText(email);
   setCopied(true);setCopyError(false);
  }catch{
   const previousFocus=document.activeElement as HTMLElement|null;
   const field=document.createElement('textarea');field.value=email;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();
   let succeeded=false;try{succeeded=document.execCommand('copy')}catch{}finally{field.remove();previousFocus?.focus({preventScroll:true})}
   setCopied(succeeded);setCopyError(!succeeded);
  }
  timer.current=setTimeout(()=>{setCopied(false);setCopyError(false)},3000);
 }
 return <><ResumeLibrary/><section id="contact" className="contact contact-paper section" aria-labelledby="contact-paper-title">
  <div className="contact-paper-glow" aria-hidden="true"/>
  <div className="contact-paper-stage"><div className="contact-paper-sheet">
   <div className="contact-paper-content">
    <span className="contact-paper-kicker"><i/>06 / THE NEXT CHAPTER</span>
    <div className="contact-paper-message"><p>GOOD WORK STARTS WITH A CONVERSATION</p><h2 id="contact-paper-title">Have an idea?<br/><em>Let&apos;s make it real.</em></h2><span>Whether it&apos;s a role, a project, or a new question worth exploring, I&apos;d love to hear from you.</span></div>
    <span className="contact-paper-signature">SANKET PRAJAPATI <span>â†—</span> VADODARA, INDIA</span>
   </div>
   <div className="contact-paper-ticket"><span className="contact-paper-tear-progress" aria-hidden="true"/>
    <div className="contact-paper-ticket-top"><span>TEAR HERE / SAY HELLO</span><span>SP â€” 06</span></div>
    <div className="contact-paper-ticket-center"><span>OPEN TO A CONVERSATION</span><strong>Your message<br/>starts here<span>.</span></strong><p>Choose whichever way works best for you.</p></div>
    <DirectContact/>
    <span className="contact-paper-ticket-foot">DIRECT LINE / NO FORM NEEDED</span>
   </div>
  </div></div>
  <div className="contact-paper-bottom"><div><a className="email" href="mailto:sanket2742003@gmail.com">sanket2742003@gmail.com</a><button className="copy-email" onClick={copy} aria-label="Copy email address">{copied?<Check size={18}/>:<Copy size={18}/>}</button><span className="copy-status" role="status">{copied?'Copied!':copyError?'Copy failed — select the email address':''}</span></div></div>
 </section></>;
}export function ProfilePage({slug}:{slug:string}){const p=profiles.find(x=>x.slug===slug)!;return <Shell><main id="main" className={`detail-main theme-${p.slug}`} style={{'--accent':p.color} as React.CSSProperties}><div className="profile-switcher" aria-label="Professional profiles">{profiles.map(x=><Link key={x.slug} href={`/profiles/${x.slug}/`} aria-current={x.slug===p.slug?'page':undefined}>{x.short}<ArrowUpRight size={13}/></Link>)}</div><section className="section profile-intro"><Eyebrow number={p.number}>PROFESSIONAL WORLD</Eyebrow><div className="profile-intro-symbol" aria-hidden="true">{p.symbol}</div><h1>{p.name}<span className="dot">.</span></h1><p className="lead">{p.intro}</p><p className="profile-description">{p.description}</p><ResumeActions slug={p.slug}/><a className="text-link" href="#profile-projects">Explore projects <ArrowDown size={16}/></a></section><section className="section profile-skills"><Eyebrow number="A">TOOLS & THINKING</Eyebrow><div className="skill-list">{p.skills.map(s=><span key={s}>{s}</span>)}</div></section><section id="profile-projects" className="section"><div className="section-heading"><h2>In this <span className="serif">world.</span></h2><p>Project topics and evidence notes.<br/>No unverified results or metrics.</p></div><div className="project-grid">{projects.filter(x=>x.profile===p.slug).map((x,i)=><ProjectCard key={x.slug} project={x} index={i}/>)}</div></section><RelevantExperience slug={p.slug}/><Contact/></main></Shell>}
export function ProjectPage({slug}:{slug:string}){const p=projects.find(x=>x.slug===slug)!;const profile=profiles.find(x=>x.slug===p.profile)!;const evidence=photoEvidence[p.slug];return <Shell><main id="main" className="detail-main"><section className="section project-intro"><Link className="text-link" href={`/profiles/${profile.slug}/`}>â† {profile.name}</Link><div className="eyebrow">{p.type}</div><h1>{p.title}<span className="dot">.</span></h1><p className="lead">{p.description}</p><div className="project-stack">{p.stack.map(s=><span key={s}>{s}</span>)}</div><ProjectArt project={p}/></section><section className="section project-story"><div><Eyebrow number="01">THE QUESTION</Eyebrow><h2>{p.question}</h2></div><div><h3>Project evidence</h3><p>{evidence?evidence.description:"The project title and topic were supplied for this portfolio. An authentic screenshot, source repository and implementation details have not yet been provided."}</p><dl><dt>Status</dt><dd>{evidence?'Project documented through supplied photographs.':p.slug==='fatigue-detection'?'Proposed concept. Not clinically validated.':'Implementation or research milestone awaiting confirmation.'}</dd><dt>Role & contribution</dt><dd>Detailed contribution awaiting confirmation.</dd><dt>Implemented features & results</dt><dd>Awaiting source review. No performance metrics claimed.</dd><dt>Technology</dt><dd>{['indian-coffee-bazaar','controlled-summarization'].includes(p.slug)?'Technology named in the supplied brief.':'Tags describe the project topic; the precise implementation stack requires repository verification.'}</dd><dt>Preview</dt><dd>{evidence?<a href={`/images/personal/${evidence.image}`} target="_blank" rel="noreferrer">Open original project photograph â†—</a>:"Original concept illustration, not a screenshot of the application."}</dd></dl><External href={github}>Explore Sanketâ€™s GitHub</External><p className="evidence-note">Project-specific repository and live demo links will appear once verified.</p></div></section><section className="section next-project"><p>CONTINUE EXPLORING</p><Link href={`/profiles/${profile.slug}/`}>Back to {profile.short} <ArrowUpRight/></Link></section><Contact/></main></Shell>}
