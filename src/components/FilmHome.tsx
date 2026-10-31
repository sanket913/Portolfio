'use client';

import Link from 'next/link';
import PortfolioHero from './PortfolioHero';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhotoJournal from './PhotoJournal';
import { Shell } from './AppShell';
import { Contact } from './Experience';
import { profiles, projects } from '@/lib/content';
import { photoEvidence } from '@/lib/photo-content';

const worldPresentation:Record<string,{verb:string;focus:string;image?:string;imagePosition?:string;caption:string;tags:string[]}>= {
  'full-stack':{verb:'BUILD.',focus:'Interfaces to systems',image:'/images/personal/peoplepay360-hackathon.jpeg',imagePosition:'center 31%',caption:'PeoplePay360 · original project photo',tags:['React','APIs','Databases']},
  'data-analytics':{verb:'DECODE.',focus:'Data to decisions',caption:'Exploration · illustrated data visual',tags:['Python','SQL','Pandas']},
  'ai-ml':{verb:'QUESTION.',focus:'Ideas to experiments',image:'/images/personal/p11.jpeg',imagePosition:'77% center',caption:'Talent Ranker · original project photo',tags:['NLP','ML','Research']},
};

function WorkReel({reduced}:{reduced:boolean}){
  const host=useRef<HTMLDivElement>(null),strip=useRef<HTMLDivElement>(null);const selected=projects.filter(p=>['peoplepay360','flowforge-erp','kalakar-art-academy'].includes(p.slug));
  useLayoutEffect(()=>{if(reduced||!host.current||!strip.current)return;gsap.registerPlugin(ScrollTrigger);const context=gsap.context(()=>{gsap.to(strip.current,{xPercent:-66.666667,ease:'none',scrollTrigger:{trigger:host.current,start:'top top+=88',end:'bottom bottom',scrub:.65,invalidateOnRefresh:true}})},host);return()=>context.revert()},[reduced]);
  return <div className="film-reel-track paper-reel" ref={host}><div className="film-reel-window"><div className="film-reel-strip" ref={strip}>{selected.map((project,i)=>{const evidence=photoEvidence[project.slug];return <article className={`film-project-slide paper-slide paper-slide-${i+1}`} key={project.slug}>
    <div className="paper-sheet-wrap"><div className="paper-sheet">
      <div className="paper-sheet-head"><span className="paper-spark" aria-hidden="true">✳</span><span>THE WORK / CASE FILE 0{i+1}</span><span>ORIGINAL PROJECT ARCHIVE</span></div>
      <div className="paper-sheet-body"><div className="film-project-visual paper-photo-stage"><div className="paper-photo-mount"><img src={`/images/personal/${evidence.image}`} alt={evidence.caption} loading="lazy"/><span className="paper-photo-label">FIG. 0{i+1} &nbsp; / &nbsp; IN THE MAKING</span></div><span className="paper-tape" aria-hidden="true"/><span className="paper-photo-caption">{evidence.caption}</span></div>
      <div className="film-project-copy paper-story"><div className="paper-story-top"><span className="film-kicker">{project.category}</span><span className="paper-stamp">SANKET<br/>PRAJAPATI</span></div><span className="paper-story-index" aria-hidden="true">0{i+1}</span><h3>{project.title}</h3><p>{project.question}</p><div className="paper-story-rule"/><Link href={`/projects/${project.slug}/`} className="film-project-link">Explore the project <ArrowUpRight size={19}/></Link><small>REAL PROJECT &nbsp;·&nbsp; ORIGINAL PHOTOGRAPH</small></div></div>
      <div className="paper-sheet-foot"><span>SELECTED WORK / 2026</span><span>SCROLL TO TURN THE PAGE <span aria-hidden="true">→</span></span></div>
    </div></div><span className="film-project-index paper-outside-index">0{i+1} / 03 <i/></span>
  </article>})}</div></div></div>;
}

export default function FilmHome(){
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
  useLayoutEffect(()=>{
    if(reduced)return;gsap.registerPlugin(ScrollTrigger);
    const context=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('.film-content h2,.film-world-links>a,.film-research-list article,.film-experience-row').forEach(el=>gsap.fromTo(el,{y:38,opacity:.2},{y:0,opacity:1,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',toggleActions:'play none none reverse'}}));
      gsap.to('.film-manifesto-text',{xPercent:-24,ease:'none',scrollTrigger:{trigger:'.film-manifesto',start:'top bottom',end:'bottom top',scrub:1}});
      gsap.to('.about-playhead',{left:'96%',ease:'none',scrollTrigger:{trigger:'.about-editor',start:'top 88%',end:'bottom 18%',scrub:.7}});
      gsap.fromTo('.about-preview-image',{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:'.about-editor',start:'top bottom',end:'bottom top',scrub:1}});
    });return()=>context.revert();
  },[reduced]);

  return <Shell><main id="main" className={`film-home${reduced?' film-reduced':''}`}>
    <PortfolioHero/>

    <div className="film-manifesto" aria-label="Built with curiosity. Made to explore."><div className="film-manifesto-text" aria-hidden="true">BUILT WITH CURIOSITY <span>✳</span> MADE TO EXPLORE <span>✳</span> BUILT WITH CURIOSITY</div><p>A developer’s mind. An explorer’s perspective.</p></div>

    <section id="profiles" className="film-world-index film-content">
      <div className="film-section-top"><span className="film-kicker">01 / EXPLORE MY PRACTICE</span><span>THREE PATHS INTO THE WORK</span></div>
      <div className="worlds-heading"><h2>One builder.<br/><em>Three lenses.</em></h2><p>Explore the side of my work that fits your opportunity. Each path opens real projects, tools and the thinking behind them.</p></div>
      <div className="film-world-links world-portals">{profiles.map((profile,i)=>{const design=worldPresentation[profile.slug];return <Link href={`/profiles/${profile.slug}/`} key={profile.slug} className={`world-portal world-portal-${profile.slug}`} style={{'--world-color':profile.color} as React.CSSProperties} aria-label={`Explore ${profile.name} profile`}>
       <div className="world-portal-top"><span>0{i+1} / 03</span><span>{design.focus}</span></div>
       <div className={`world-portal-visual${design.image?' has-photo':' has-chart'}`}>
        {design.image?<img src={design.image} alt="" loading="lazy" style={{objectPosition:design.imagePosition}}/>:<div className="world-chart" aria-hidden="true"><div className="world-chart-grid"/><div className="world-chart-line"/><span className="world-chart-bar one"/><span className="world-chart-bar two"/><span className="world-chart-bar three"/><span className="world-chart-bar four"/><span className="world-chart-bar five"/><span className="world-chart-bar six"/></div>}
        <strong className="world-portal-verb" aria-hidden="true">{design.verb}</strong><span className="world-visual-caption">{design.caption}</span>
       </div>
       <div className="world-portal-body"><span className="world-portal-kicker">{profile.short}</span><h3 className="film-world-title">{profile.name}</h3><p>{profile.intro}</p><div className="world-portal-tags">{design.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
       <div className="world-portal-bottom"><span>Explore this world</span><span className="film-world-enter"><ArrowUpRight size={22}/></span></div>
      </Link>})}</div>
    </section>

    <section id="work" className="film-selected-work">
      <div className="film-work-heading film-content"><div className="film-section-top"><span className="film-kicker">02 / SELECTED EXPLORATIONS</span><span>FROM A QUESTION TO SOMETHING TANGIBLE.</span></div><h2>Less talking.<br/><em>More making.</em></h2><p>Real projects. Real screens. A closer look at what I build.</p></div>
      <WorkReel reduced={reduced}/>
      <div className="film-work-foot film-content"><span>More projects, technologies and implementation notes live inside each world.</span><a href="#profiles">Explore all three worlds <ArrowUpRight size={17}/></a></div>
    </section>

    <section id="about" className="film-about film-content about-studio">
      <div className="film-section-top"><span className="film-kicker">03 / THE PERSON BEHIND THE PIXELS</span><span>ALWAYS A WORK IN PROGRESS.</span></div>
      <div className="about-intro"><div><span className="about-eyebrow"><Sparkles size={15}/> THE HUMAN IN THE FRAME</span><h2>Built by a person.<br/><em>Driven by curiosity.</em></h2></div><p>A closer look at the person, the practice and the learning behind the work.</p></div>
      <div className="about-editor">
        <div className="about-editor-bar"><div className="about-editor-lights" aria-hidden="true"><i/><i/><i/></div><span>ABOUT_SANKET / THE STORY</span><span>01 — 03 &nbsp;·&nbsp; PROFILE EDIT</span></div>
        <div className="about-editor-main"><figure className="about-preview"><div className="about-preview-screen"><img className="about-preview-image" src="/images/personal/p10.jpeg" alt="Sanket working at his laptop" loading="lazy"/><span className="about-preview-frame">01 / ORIGINAL MOMENT</span><span className="about-preview-corner" aria-hidden="true"/></div><figcaption><span>PREVIEW / THE PERSON BEHIND THE WORK</span><span>ORIGINAL PHOTOGRAPH</span></figcaption></figure>
        <div className="about-inspector"><div className="about-inspector-label"><span>THE STORY / 01</span><span className="about-inspector-dot"/> OPEN TO WHAT'S NEXT</div><h3>Human first.<br/><em>Builder always.</em></h3><p className="about-inspector-lead">I’m Sanket Prajapati, an early-career developer pursuing an M.Tech in Artificial Intelligence and Data Science.</p><p>My IT background connects full-stack development, data processing, machine learning and AI application prototyping. I like building something useful, understanding how it works, then asking what could be better.</p><div className="about-inspector-note"><Sparkles size={17}/><span>Curiosity is the common thread.</span></div></div></div>
        <div className="about-timeline"><div className="about-timeline-top"><span>LEARNING / THREE CHAPTERS</span><span>EDUCATION TIMELINE</span></div><div className="about-timeline-ruler" aria-hidden="true"><span>01 / FOUNDATION</span><span>02 / UNDERGRADUATE</span><span>03 / CURRENT</span><i className="about-playhead"/></div><div className="about-tracks">
          <div className="about-track"><span className="about-track-number">01</span><div className="about-track-card"><span>FOUNDATION</span><h4>Diploma · Information Technology</h4><p>The Maharaja Sayajirao University of Baroda</p></div><strong>85<small>%</small></strong></div>
          <div className="about-track"><span className="about-track-number">02</span><div className="about-track-card"><span>UNDERGRADUATE</span><h4>B.Tech · Information Technology</h4><p>Parul University</p></div><strong>8.68<small>/ 10 CGPA</small></strong></div>
          <div className="about-track"><span className="about-track-number">03</span><div className="about-track-card"><span>EXPECTED 2027</span><h4>M.Tech · AI & Data Science</h4><p>Parul Institute of Engineering and Technology</p></div><strong>9.08<small>/ 10 CGPA</small></strong></div>
        </div><div className="about-timeline-foot"><span>STILL LEARNING. STILL BUILDING.</span><span>CONTINUE SCROLLING ↓</span></div></div>
      </div>
    </section>

    <PhotoJournal/>

    <section id="research" className="film-research film-content"><div className="film-section-top"><span className="film-kicker">04 / QUESTIONS WORTH ASKING</span><span>RESEARCH & EXPERIMENTS</span></div><h2>Beyond the output.<br/><em>Into the why.</em></h2><div className="film-research-list">{[{title:'Context-aware controlled summarization',text:'Exploring how LLM summaries can preserve context and respond to constraints.',status:'RESEARCH TOPIC',slug:'controlled-summarization'},{title:'The emotions inside language',text:'Emotion-aware text classification and multilingual sentiment analysis.',status:'EXPERIMENT TOPICS',slug:'emotion-classification'},{title:'Understanding the decision',text:'Interpretable machine learning, SHAP, LIME and responsible AI.',status:'RESEARCH INTEREST',slug:null}].map((item,i)=><article key={item.title}><span className="film-research-count">0{i+1}</span><div><span className="film-status">{item.status}</span><h3>{item.title}</h3><p>{item.text}</p></div>{item.slug&&<Link href={`/projects/${item.slug}/`} aria-label={`Explore ${item.title}`}><ArrowUpRight size={24}/></Link>}</article>)}</div><p className="film-evidence">Research milestones and publication status await confirmation. No publication or clinical validation claims are made.</p></section>

    <section id="experience" className="film-experience film-content"><div className="film-section-top"><span className="film-kicker">05 / LEARNING BY DOING</span><span>EXPERIENCE</span></div><h2>A little experience.<br/><em>A growing perspective.</em></h2><div className="film-experience-row"><span>DEC 2024 — MAR 2025</span><div><h3>Full-Stack Developer Intern</h3><p>Mamo Technolabs LLP</p></div><span>DEVELOPMENT</span></div><div className="film-experience-row"><span>MAY 2024 — AUG 2024</span><div><h3>Machine Learning Intern</h3><p>ByteXL</p></div><span>MACHINE LEARNING</span></div><p className="film-evidence">Roles and dates supplied by Sanket. Detailed responsibilities and outcomes await confirmation.</p></section>
    <div className="film-contact-wrap"><Contact/></div>
    <div className="film-endnote"><span>BUILT WITH CURIOSITY. EXPLORING WHAT’S NEXT.</span><div><a href="https://github.com/sanket913" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><a href="https://www.linkedin.com/in/sanket-prajapati27/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a></div></div>
  </main></Shell>;
}
