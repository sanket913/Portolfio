'use client';

import {useLayoutEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const chapters=[
 {selector:'.hero-premiere',label:'INTRODUCTION',line:'Ideas become real here.',image:'/images/personal/p6.jpeg'},
 {selector:'#profiles',label:'PERSPECTIVES',line:'Three ways to see the work.',image:'/images/personal/p11.jpeg'},
 {selector:'#work',label:'SELECTED WORK',line:'Built in the real world.',image:'/images/personal/peoplepay360-hackathon.jpeg'},
 {selector:'#about',label:'THE PERSON',line:'Curiosity has a backstory.',image:'/images/personal/p10.jpeg'},
 {selector:'#moments',label:'FIELD NOTES',line:'Beyond the screen.',image:'/images/personal/p2.jpeg'},
 {selector:'#experience',label:'EXPERIENCE',line:'Learning by doing.',image:'/images/personal/p7.jpeg'},
 {selector:'#resumes',label:'RESUMES',line:'The next chapter starts here.',image:'/images/personal/odoo-visit.jpeg'},
 {selector:'#contact',label:'CONTACT',line:'Let’s build what matters.',image:'/images/personal/p6.jpeg'},
 {selector:'.footer-cinema',label:'CREDITS',line:'Keep asking better questions.',image:'/images/personal/p8.jpeg'},
];

export function ScrollFilmDirector(){
 const [active,setActive]=useState(0);
 const progress=useRef<HTMLSpanElement>(null);
 const stage=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cinematic=matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
  const context=gsap.context(()=>{
   chapters.forEach((chapter,index)=>{
    const element=document.querySelector<HTMLElement>(chapter.selector);
    if(!element)return;
    ScrollTrigger.create({trigger:element,start:'top 52%',end:'bottom 52%',onEnter:()=>setActive(index),onEnterBack:()=>setActive(index)});
   });
   ScrollTrigger.create({trigger:document.body,start:'top top',end:'bottom bottom',onUpdate:self=>{
    if(progress.current)progress.current.style.transform=`scaleY(${self.progress})`;
   }});
   if(reduced)return;

   // Each section opens with a full-screen photographic frame. The frame is tied
   // to scroll progress, so reversing the scroll reverses the scene exactly.
   chapters.slice(1).forEach((chapter,index)=>{
    const section=document.querySelector<HTMLElement>(chapter.selector);
    if(!section)return;
    ScrollTrigger.create({trigger:section,start:'top bottom',end:'top 38%',onUpdate:self=>{
     const film=stage.current;
     if(!film)return;
     const value=self.progress;
     const strength=Math.min(1,Math.pow(Math.sin(Math.PI*value),1.3)*1.7);
     film.style.opacity=String(strength);
     film.style.visibility=strength<.015?'hidden':'visible';
     film.style.setProperty('--film-progress',String(value));
     const frame=film.children[index] as HTMLElement|undefined;
     if(film.dataset.scene!==String(index)){
      for(const child of Array.from(film.children))child.classList.remove('is-current');
      frame?.classList.add('is-current');
      film.dataset.scene=String(index);
     }
     const picture=frame?.querySelector<HTMLElement>('img');
     if(picture)picture.style.transform=`translate3d(0,${(1-value)*-7}%,0) scale(${1.19-value*.19})`;
    },onLeave:()=>{if(stage.current?.dataset.scene===String(index)){stage.current.style.opacity='0';stage.current.style.visibility='hidden'}},onLeaveBack:()=>{if(stage.current?.dataset.scene===String(index)){stage.current.style.opacity='0';stage.current.style.visibility='hidden'}}});
   });

   if(cinematic){
    for(const selector of ['#profiles','#work','#about','#moments','#experience','#resumes','#contact']){
     const element=document.querySelector<HTMLElement>(selector);
     if(element)gsap.fromTo(element,{clipPath:'inset(7% 1.4% 7% 1.4% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:element,start:'top 98%',end:'top 36%',scrub:.65}});
    }
   }

   for(const selector of ['.work-cinema-sidebar h2','.person-story-heading h2','.journal-heading h2','.experience-cinema-intro h2','.resume-showcase-heading h2','.contact-paper-message h2']){
    const heading=document.querySelector<HTMLElement>(selector);
    if(heading)gsap.fromTo(heading,{y:cinematic?48:20,opacity:.65},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:heading,start:'top 92%',once:true}});
   }

   gsap.utils.toArray<HTMLElement>('.v3-profile-art').forEach(art=>{
    const card=art.closest('.v3-profile');
    if(card)gsap.fromTo(art,{scale:1.06,yPercent:-3},{scale:1,yPercent:3,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:.8}});
   });
   gsap.fromTo('.v3-data-chart i',{scaleY:.18},{scaleY:1,stagger:.08,duration:1,ease:'power2.out',scrollTrigger:{trigger:'.v3-data-chart',start:'top 85%',once:true}});
   gsap.utils.toArray<HTMLElement>('.work-cinema-card').forEach((card,index)=>{
    gsap.fromTo(card,{scale:cinematic?.93:.98,rotation:cinematic?(index%2?1:-1):0},{scale:1,rotation:0,ease:'none',scrollTrigger:{trigger:card,start:'top 96%',end:'center 58%',scrub:.7}});
   });
   const portrait=document.querySelector<HTMLElement>('.person-story-photo');
   if(portrait)gsap.fromTo(portrait,{clipPath:'inset(0% 13% 0% 0% round 30px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:portrait,start:'top 95%',end:'center 57%',scrub:.7}});

   gsap.utils.toArray<HTMLElement>('.journal-photo').forEach((photo,index)=>{
    gsap.fromTo(photo,{y:cinematic?65:24,rotation:cinematic?(index%2?2:-2):0,opacity:.65},{y:0,rotation:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:photo,start:'top 93%',once:true}});
   });
   gsap.utils.toArray<HTMLElement>('.experience-cinema-monogram').forEach(mark=>{
    const card=mark.closest('.experience-cinema-card');
    if(card)gsap.fromTo(mark,{xPercent:12,rotation:-7,opacity:.4},{xPercent:-3,rotation:3,opacity:1,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:.8}});
   });
   gsap.utils.toArray<HTMLElement>('.resume-showcase-paper-inner').forEach(paper=>{
    const card=paper.closest('.resume-showcase-card');
    if(card)gsap.fromTo(paper,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:.8}});
   });
   gsap.fromTo('.contact-paper-glow',{yPercent:-12,scale:.88},{yPercent:10,scale:1.08,ease:'none',scrollTrigger:{trigger:'#contact',start:'top bottom',end:'bottom top',scrub:.8}});
  });
  return()=>context.revert();
 },[]);
 return <><div className="scroll-film-stage" ref={stage} aria-hidden="true">{chapters.slice(1).map((chapter,index)=><div className="scroll-film-frame" key={chapter.selector}><img src={chapter.image} alt="" loading="eager" decoding="async"/><div className="scroll-film-vignette"/><div className="scroll-film-frame-top"><span>SANKET PRAJAPATI / A PORTFOLIO FILM</span><span>CHAPTER {String(index+2).padStart(2,'0')} / 09</span></div><div className="scroll-film-frame-title"><span>{chapter.label}</span><strong>{chapter.line}</strong></div><div className="scroll-film-frame-bottom"><span>SCROLL TO CONTINUE</span><span>VADODARA / INDIA</span></div></div>)}</div><div className="scroll-film-hud" aria-hidden="true"><span>SCENE <b>{String(active+1).padStart(2,'0')}</b> / 09</span><div className="scroll-film-track"><span ref={progress}/></div><strong>{chapters[active].label}</strong></div></>;
}
