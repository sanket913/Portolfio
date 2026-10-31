'use client';
import {useRef,useState} from 'react';
import {ArrowUpRight,ArrowLeft,ArrowRight,X} from 'lucide-react';
import {personalPhotos} from '@/lib/photo-content';

export default function PhotoJournal(){
 const dialog=useRef<HTMLDialogElement>(null);const [active,setActive]=useState(0);
 const photo=personalPhotos[active];
 const step=(n:number)=>setActive(i=>(i+n+personalPhotos.length)%personalPhotos.length);
 const open=(i:number)=>{setActive(i);dialog.current?.showModal()};
 return <section id="moments" className="photo-journal film-content">
  <div className="film-section-top"><span className="film-kicker">FIELD NOTES / THE REAL JOURNEY</span><span>PERSONAL PHOTOGRAPHS & PARTICIPATION</span></div>
  <div className="journal-heading"><h2>Beyond<br/><em>the screen.</em></h2><p>The people, places and late-night builds behind the portfolio. A few moments from learning in the real world.</p></div>
  <div className="journal-grid">{personalPhotos.map((item,i)=><button className={`journal-photo journal-photo-${i}`} key={item.file} onClick={()=>open(i)} aria-label={`View ${item.title}`}><div className="journal-image"><img src={`/images/personal/${item.file}`} alt={item.title} loading="lazy" style={{objectPosition:item.position}}/><span>VIEW ORIGINAL <ArrowUpRight size={16}/></span></div><div className="journal-caption"><h3>{item.title}</h3><p>{item.note}</p></div></button>)}</div>
  <dialog ref={dialog} data-lenis-prevent className="photo-dialog" aria-label="Original portfolio photographs" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}}}>
   <div className="photo-dialog-bar"><span>{active+1} / {personalPhotos.length} · ORIGINAL PHOTOGRAPH</span><button onClick={()=>dialog.current?.close()} aria-label="Close photograph"><X/></button></div>
   <img src={`/images/personal/${photo.file}`} alt={photo.title}/>
   <div className="photo-dialog-foot"><button onClick={()=>step(-1)} aria-label="Previous photograph"><ArrowLeft/></button><div><h3>{photo.title}</h3><p>{photo.note}</p><a href={`/images/personal/${photo.file}`} target="_blank" rel="noreferrer">Open full-resolution photo ↗</a></div><button onClick={()=>step(1)} aria-label="Next photograph"><ArrowRight/></button></div>
  </dialog>
 </section>;
}
