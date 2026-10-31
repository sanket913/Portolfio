'use client';

import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowUpRight,FileText} from 'lucide-react';

export default function PortfolioHero(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const el=root.current;if(!el)return;const motion=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;let visible=true;
  const paint=()=>{frame=0;if(!visible)return;const travel=motion.matches?0:Math.max(0,Math.min(1,-el.getBoundingClientRect().top/el.offsetHeight));el.style.setProperty('--hero-travel',String(travel));};
  const schedule=()=>{if(!frame&&visible)frame=requestAnimationFrame(paint)};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule()});observer.observe(el);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);motion.addEventListener('change',schedule);paint();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule)};
 },[]);

 return <section ref={root} className="portfolio-hero" aria-labelledby="portfolio-title">
  <div className="hero-topline"><span>01 / THE INTRODUCTION</span><span className="hero-availability"><i/> AVAILABLE FOR OPPORTUNITIES</span><span>VADODARA, INDIA</span></div>
  <div className="hero-composition">
   <div className="hero-editorial">
    <p className="hero-byline"><span>HELLO, I&apos;M</span> SANKET PRAJAPATI</p>
    <h1 id="portfolio-title"><span>Ideas, made </span><em>real.</em></h1>
    <div className="hero-editorial-rule"><span>DEVELOPER</span><b/> <span>DATA EXPLORER</span><b/> <span>AI RESEARCHER</span></div>
    <p className="hero-summary">I bring thoughtful code, data and curiosity together to build useful digital experiences.</p>
    <div className="hero-primary-actions"><a href="#work" className="hero-work-link">Explore my work <ArrowUpRight size={19}/></a><a href="#resumes" className="hero-resume-link"><FileText size={17}/>View resumes</a></div>
    <div className="hero-signature"><span className="hero-signature-mark" aria-hidden="true">✳</span><span>THINK DEEPER.<br/>BUILD BETTER.</span></div>
   </div>
   <div className="hero-portrait-stage">
    <span className="hero-photo-index" aria-hidden="true">A PORTRAIT OF THE PERSON BEHIND THE WORK</span>
    <div className="hero-photo-frame"><img className="hero-real-portrait" src="/images/personal/p6.jpeg" width="1052" height="1600" alt="Sanket Prajapati leaning on a railing in his graduation attire" fetchPriority="high"/><div className="hero-photo-shade" aria-hidden="true"/></div>
    <div className="hero-portrait-caption"><span>MEET THE MAKER</span><strong>Sanket Prajapati</strong><span>Developer · Data · AI</span></div>
    <span className="hero-photo-coordinate" aria-hidden="true">VADODARA · INDIA</span>
   </div>
  </div>
  <div className="hero-bottom-line"><a href="#profiles" className="hero-scroll-link"><span><ArrowDown size={17}/></span>Explore my worlds</a><nav className="hero-disciplines-new" aria-label="Explore professional profiles"><Link href="/profiles/full-stack/"><span>01</span> Development <ArrowUpRight size={14}/></Link><Link href="/profiles/data-analytics/"><span>02</span> Data <ArrowUpRight size={14}/></Link><Link href="/profiles/ai-ml/"><span>03</span> AI & research <ArrowUpRight size={14}/></Link></nav></div>
 </section>;
}
