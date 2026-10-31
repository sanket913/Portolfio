'use client';

import Link from 'next/link';
import {useEffect,useLayoutEffect,useState} from 'react';
import {ArrowDown,ArrowRight,ArrowUpRight} from 'lucide-react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Shell} from './AppShell';
import {Contact} from './Experience';
import PhotoJournal from './PhotoJournal';
import {ScrollFilmDirector} from './ScrollFilmDirector';
import {projects} from '@/lib/content';
import {photoEvidence} from '@/lib/photo-content';

const featured=['peoplepay360','flowforge-erp','kalakar-art-academy'].map(slug=>projects.find(p=>p.slug===slug)!);
const scenes=[
 {number:'01',title:'Full-stack development',detail:'Interfaces, APIs and the systems behind them.',slug:'full-stack',tone:'peach',photo:'/images/personal/peoplepay360-hackathon.jpeg',alt:'PeoplePay360 interface at the Odoo Hackathon'},
 {number:'02',title:'Data & analytics',detail:'Making patterns in information easier to understand.',slug:'data-analytics',tone:'lavender',photo:null,alt:'Illustrative data visualization'},
 {number:'03',title:'AI & research',detail:'Exploring language, context and responsible systems.',slug:'ai-ml',tone:'mint',photo:'/images/personal/p11.jpeg',alt:'Talent Ranker hackathon presentation'},
];

export default function PortfolioHomeV3(){
 const [activeProject,setActiveProject]=useState(0);
 const [activeEducation,setActiveEducation]=useState(0);
 useEffect(()=>{
  const cards=Array.from(document.querySelectorAll<HTMLElement>('.work-cinema-card'));
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top+a.boundingClientRect.height/2-innerHeight*.45)-Math.abs(b.boundingClientRect.top+b.boundingClientRect.height/2-innerHeight*.45));
   if(visible.length)setActiveProject(cards.indexOf(visible[0].target as HTMLElement));
  },{rootMargin:'-35% 0px -45% 0px'});
  cards.forEach(card=>observer.observe(card));
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  const steps=Array.from(document.querySelectorAll<HTMLElement>('.person-story-step'));
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top+a.boundingClientRect.height/2-innerHeight*.45)-Math.abs(b.boundingClientRect.top+b.boundingClientRect.height/2-innerHeight*.45));
   if(visible.length)setActiveEducation(steps.indexOf(visible[0].target as HTMLElement));
  },{rootMargin:'-30% 0px -45% 0px'});
  steps.forEach(step=>observer.observe(step));
  return()=>observer.disconnect();
 },[]);
 useLayoutEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>('.v3-reveal').forEach(el=>gsap.fromTo(el,{y:48,opacity:0},{y:0,opacity:1,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
   gsap.utils.toArray<HTMLElement>('.work-cinema-card').forEach(card=>{
    const image=card.querySelector<HTMLElement>('.work-cinema-photo');
    if(image)gsap.fromTo(image,{scale:1.07,yPercent:-2},{scale:1,yPercent:2,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:.7}});
   });
   gsap.fromTo('.person-story-photo>img',{scale:1.08,yPercent:-5},{scale:1.03,yPercent:5,ease:'none',scrollTrigger:{trigger:'.person-story',start:'top bottom',end:'bottom top',scrub:.8}});
   const experience=document.querySelector('.experience-cinema');
   if(experience){
    gsap.fromTo('.experience-cinema-progress>span',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:experience,start:'top 55%',end:'bottom 65%',scrub:.5}});
    gsap.utils.toArray<HTMLElement>('.experience-cinema-card').forEach(card=>{
     gsap.fromTo(card,{y:36,opacity:.7},{y:0,opacity:1,duration:.85,ease:'power2.out',scrollTrigger:{trigger:card,start:'top 88%',once:true}});
     ScrollTrigger.create({trigger:card,start:'top 72%',end:'bottom 28%',toggleClass:{targets:card,className:'is-current'}});
    });
   }
   const resumes=document.querySelector('.portfolio-v3 .resume-showcase');
   if(resumes){
    gsap.fromTo('.portfolio-v3 .resume-showcase-progress>span',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:resumes,start:'top 68%',end:'bottom 78%',scrub:.5}});
    gsap.utils.toArray<HTMLElement>('.portfolio-v3 .resume-showcase-card').forEach((card,index)=>{
     gsap.fromTo(card,{y:40,rotation:index===0?-1.5:1,opacity:.65},{y:0,rotation:0,opacity:1,duration:.9,ease:'power2.out',scrollTrigger:{trigger:card,start:'top 90%',once:true}});
    });
   }
   const contact=document.querySelector('.portfolio-v3 .contact-paper');
   if(contact){
    gsap.fromTo('.portfolio-v3 .contact-paper-stage',{y:70,rotation:-1.5,opacity:.55},{y:0,rotation:0,opacity:1,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:contact,start:'top 85%',once:true}});
    gsap.fromTo('.portfolio-v3 .contact-paper-tear-progress',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:contact,start:'top 70%',end:'bottom 70%',scrub:.6}});
   }
   const hero=document.querySelector('.hero-premiere');
   if(hero){
    const desktop=matchMedia('(min-width: 900px)').matches;
    const movement=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.8}});
    movement.to('.hero-premiere-portrait',{yPercent:desktop?9:3,scale:desktop?1.07:1.025,rotationY:desktop?0:undefined,rotationZ:desktop?0:undefined,ease:'none'},0);
    movement.to('.hero-premiere-halo',{scale:1.25,opacity:.8,ease:'none'},0);
    if(desktop){
     movement.to('.hero-premiere-orbit',{rotation:22,yPercent:-10,ease:'none'},0);
     movement.to('.hero-premiere-chip',{yPercent:-25,rotationZ:-4,ease:'none'},0);
     movement.to('.hero-premiere-title',{yPercent:-9,ease:'none'},0);
    }
   }
  });return()=>ctx.revert();
 },[]);
 return <Shell><main id="main" className="portfolio-v3"><ScrollFilmDirector/>
  <section className="v3-hero hero-premiere" aria-labelledby="portfolio-title">
   <div className="hero-premiere-grid" aria-hidden="true"/>
   <div className="v3-hero-copy hero-premiere-copy">
    <div className="hero-premiere-intro"><span className="hero-premiere-live"/> SANKET PRAJAPATI <span className="hero-premiere-intro-separator"/> PORTFOLIO / 2026</div>
    <div className="hero-premiere-main"><span className="hero-premiere-kicker">DEVELOPMENT / DATA / ARTIFICIAL INTELLIGENCE</span><h1 id="portfolio-title" className="hero-premiere-title">Ideas become<br/><span>real here.</span></h1><p>I&apos;m Sanket, a developer exploring data and AI. I turn curious questions into useful digital experiences.</p><div className="v3-actions"><a className="v3-button v3-button-primary" href="#work">Explore my work <ArrowUpRight size={19}/></a><a className="v3-button v3-button-quiet" href="#resumes">View my resumes <ArrowRight size={18}/></a></div></div>
    <div className="hero-premiere-bottom"><span>01 / INTRODUCTION</span><a href="#profiles" aria-label="Explore my worlds">Explore my worlds <ArrowDown size={17}/></a></div>
   </div>
   <div className="v3-hero-visual hero-premiere-visual"><div className="hero-premiere-halo" aria-hidden="true"/><div className="hero-premiere-orbit" aria-hidden="true"/><div className="hero-premiere-portrait"><div className="hero-premiere-backplate" aria-hidden="true"/><div className="v3-hero-photo hero-premiere-frame"><img className="hero-real-portrait" src="/images/personal/p6.jpeg" alt="Sanket Prajapati in graduation attire, leaning on a railing" fetchPriority="high"/></div><span className="hero-premiere-photo-caption">THE PERSON BEHIND THE PROJECTS <ArrowUpRight size={15}/></span></div><div className="hero-premiere-chip"><span className="hero-premiere-chip-mark">✳</span><span>FULL-STACK<br/>DATA & AI</span></div><div className="hero-premiere-visual-index" aria-hidden="true">SP / 01</div></div>
  </section>

  <div className="v3-marquee" aria-label="Build, learn, explore"><div aria-hidden="true">BUILD WHAT MATTERS <span>✳</span> ASK BETTER QUESTIONS <span>✳</span> MAKE IT USEFUL <span>✳</span> BUILD WHAT MATTERS <span>✳</span></div></div>

  <section id="profiles" className="v3-section v3-profiles"><div className="v3-section-heading v3-reveal"><span className="v3-section-label">01 / THREE WAYS I WORK</span><div><h2>One person.<br/><span>More than one lens.</span></h2><p>Pick the perspective that matches what you&apos;re looking for. Each one opens projects, tools and the ideas behind them.</p></div></div><div className="v3-profile-grid">{scenes.map(scene=><Link href={`/profiles/${scene.slug}/`} key={scene.slug} className={`v3-profile v3-profile-${scene.tone} v3-reveal`} aria-label={`Explore ${scene.title} profile`}><div className="v3-profile-top"><span>{scene.number} / 03</span><span>EXPLORE THE PRACTICE <ArrowUpRight size={17}/></span></div><div className="v3-profile-art">{scene.photo?<img src={scene.photo} alt={scene.alt} loading="lazy"/>:<div className="v3-data-art" role="img" aria-label={scene.alt}><div className="v3-data-grid"/><div className="v3-data-chart"><i/><i/><i/><i/><i/><i/><i/></div><span>OBSERVE / INTERPRET / EXPLAIN</span><small>ILLUSTRATIVE DATA VISUAL</small></div>}<span className="v3-profile-art-index">{scene.number}</span></div><div className="v3-profile-bottom"><h3>{scene.title}</h3><p>{scene.detail}</p><span>Open this world <ArrowRight size={17}/></span></div></Link>)}</div></section>

  <section id="work" className="v3-section v3-work work-cinema" aria-labelledby="work-title">
   <div className="work-cinema-layout">
    <div className="work-cinema-sidebar"><div className="work-cinema-sidebar-inner"><span className="v3-section-label">02 / SELECTED WORK</span><h2 id="work-title">A closer look at <span>what I build.</span></h2><p>Three projects presented through original photographs and the questions that shaped each build.</p><div className="work-cinema-progress" aria-label={`Project ${activeProject+1} of ${featured.length}`}><div><span>NOW VIEWING</span><strong>0{activeProject+1}<small> / 0{featured.length}</small></strong></div><div className="work-cinema-track"><span style={{width:`${((activeProject+1)/featured.length)*100}%`}}/></div></div><a className="work-cinema-all" href="#profiles">Explore all three worlds <ArrowUpRight size={18}/></a></div></div>
    <div className="v3-work-list work-cinema-list">{featured.map((project,i)=>{const evidence=photoEvidence[project.slug];return <article className={`v3-project work-cinema-card work-cinema-card-${i+1}`} key={project.slug}><Link href={`/projects/${project.slug}/`} className="v3-project-image work-cinema-image" aria-label={`Explore ${project.title}`}><img className="work-cinema-photo-blur" src={`/images/personal/${evidence.image}`} alt="" loading="lazy"/><img className="work-cinema-photo" src={`/images/personal/${evidence.image}`} alt={evidence.caption} loading="lazy"/><span className="work-cinema-image-top">PROJECT FRAME / 0{i+1}</span><span className="v3-project-view">VIEW CASE STUDY <ArrowUpRight size={18}/></span></Link><div className="v3-project-info work-cinema-info"><div className="v3-project-meta"><span>0{i+1} / 0{featured.length}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.question}</p><Link href={`/projects/${project.slug}/`}>Explore this project <ArrowUpRight size={19}/></Link></div></article>})}</div>
   </div>
  </section>

  <section id="about" className="v3-section v3-about person-story" aria-labelledby="person-title">
   <div className="person-story-heading"><span className="v3-section-label">03 / THE PERSON</span><div><h2 id="person-title">Curiosity has <span>a backstory.</span></h2><p>I&apos;m Sanket Prajapati, an early-career developer pursuing an M.Tech in Artificial Intelligence and Data Science.</p></div></div>
   <div className="person-story-layout"><div className="person-story-visual"><div className="v3-about-photo person-story-photo"><img src="/images/personal/p10.jpeg" alt="Sanket working at his laptop" loading="lazy"/><div className="person-story-photo-overlay"><span>BEHIND THE WORK</span><strong>Learning by<br/>building.</strong></div><span className="person-story-photo-mark" aria-hidden="true">SP / 03</span></div><div className="person-story-photo-foot"><span>AN ORIGINAL MOMENT</span><span>VADODARA, INDIA</span></div></div>
    <div className="v3-about-copy person-story-copy"><p>My IT background connects full-stack development, data processing, machine learning and AI application prototyping. I like building something useful, understanding how it works, then asking what could be better.</p><div className="v3-education person-story-education"><h3>THE LEARNING PATH <span>0{activeEducation+1} / 03</span></h3><div className={`person-story-step${activeEducation===0?' is-active':''}`}><span>01</span><p><strong>Diploma · Information Technology</strong><small>The Maharaja Sayajirao University of Baroda</small></p><b>85%</b></div><div className={`person-story-step${activeEducation===1?' is-active':''}`}><span>02</span><p><strong>B.Tech · Information Technology</strong><small>Parul University</small></p><b>8.68<small>/10</small></b></div><div className={`person-story-step${activeEducation===2?' is-active':''}`}><span>03</span><p><strong>M.Tech · AI &amp; Data Science</strong><small>Parul Institute of Engineering and Technology · expected 2027</small></p><b>9.08<small>/10</small></b></div></div><a className="person-story-resume" href="#resumes">View my resumes <ArrowUpRight size={18}/></a></div>
   </div>
  </section>

  <PhotoJournal/>


  <section id="experience" className="v3-section v3-experience experience-cinema" aria-labelledby="experience-title">
   <div className="experience-cinema-grid" aria-hidden="true"/>
   <div className="experience-cinema-layout">
    <div className="experience-cinema-intro">
     <div className="experience-cinema-intro-inner">
      <span className="experience-cinema-eyebrow"><span className="experience-cinema-spark"/> 04 / EXPERIENCE</span>
      <h2 id="experience-title">The work<br/>behind <em>the work.</em></h2>
      <p>Two internships. Different disciplines. The same habit of learning by making.</p>
      <div className="experience-cinema-indicator"><span>2024</span><div className="experience-cinema-progress"><span/></div><span>2025</span></div>
      <span className="experience-cinema-caption">SCROLL THROUGH THE CHAPTERS <ArrowDown size={16}/></span>
     </div>
    </div>
    <div className="experience-cinema-chapters">
     <Link href="/profiles/full-stack/" className="experience-cinema-card experience-cinema-card-one" aria-label="Explore full-stack work related to Mamo Technolabs internship">
      <div className="experience-cinema-card-top"><span>CHAPTER 01 / 02</span><span>DEC 2024 — MAR 2025</span></div>
      <div className="experience-cinema-card-content"><span className="experience-cinema-monogram" aria-hidden="true">M</span><span className="experience-cinema-discipline">DEVELOPMENT / INTERNSHIP</span><h3>Full-Stack<br/>Developer Intern<span>.</span></h3><p>Mamo Technolabs LLP</p></div>
      <div className="experience-cinema-card-foot"><span>EXPLORE FULL-STACK WORK</span><span className="experience-cinema-arrow"><ArrowUpRight size={23}/></span></div>
     </Link>
     <Link href="/profiles/ai-ml/" className="experience-cinema-card experience-cinema-card-two" aria-label="Explore AI and machine learning work related to ByteXL internship">
      <div className="experience-cinema-card-top"><span>CHAPTER 02 / 02</span><span>MAY 2024 — AUG 2024</span></div>
      <div className="experience-cinema-card-content"><span className="experience-cinema-monogram" aria-hidden="true">B</span><span className="experience-cinema-discipline">MACHINE LEARNING / INTERNSHIP</span><h3>Machine Learning<br/>Intern<span>.</span></h3><p>ByteXL</p></div>
      <div className="experience-cinema-card-foot"><span>EXPLORE AI &amp; ML WORK</span><span className="experience-cinema-arrow"><ArrowUpRight size={23}/></span></div>
     </Link>
     <p className="experience-cinema-note">Roles and dates supplied by Sanket; detailed responsibilities await confirmation.</p>
    </div>
   </div>
  </section>

  <Contact/>
 </main></Shell>;
}
