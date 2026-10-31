import {ArrowUpRight,Download,FileText,Mail,MessageCircle} from 'lucide-react';

export const resumeFiles=[
 {slug:'full-stack',title:'Full-Stack Developer',description:'Web applications, APIs and database-backed systems.',file:'Sanket-Prajapati-Full-Stack.pdf'},
 {slug:'data-analytics',title:'Data Analyst',description:'Python, SQL, data exploration and analytical projects.',file:'Sanket-Prajapati-Data-Analyst.pdf'},
 {slug:'ai-ml',title:'AI & Research',description:'Machine learning, language models and research prototyping.',file:'Sanket-Prajapati-AI-Research.pdf'},
];
export function ResumeActions({slug}:{slug:string}){
 const resume=resumeFiles.find(item=>item.slug===slug)!;
 return <div className="resume-actions"><a href={`/resumes/${resume.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${resume.title} resume`}>View PDF <ArrowUpRight size={16}/></a><a href={`/resumes/${resume.file}`} download={resume.file} aria-label={`Download ${resume.title} resume`}>Download <Download size={16}/></a></div>;
}
export function ResumeLibrary(){return <section id="resumes" className="resume-library resume-showcase section" aria-labelledby="resume-title">
 <div className="resume-showcase-heading"><div><span className="resume-showcase-kicker">05 / RESUME LIBRARY</span><h2 id="resume-title">Find the right<br/><em>version of me.</em></h2></div><div className="resume-showcase-heading-side"><span>THREE PATHS / ONE BUILDER</span><p>Choose the perspective that fits your opportunity. Open the PDF or keep a copy.</p><div className="resume-showcase-progress" aria-hidden="true"><span/></div></div></div>
 <div className="resume-showcase-grid">{resumeFiles.map((resume,i)=><article className={`resume-showcase-card resume-showcase-card-${i+1}`} key={resume.slug}>
  <div className="resume-showcase-card-top"><span>PORTFOLIO FILE / 0{i+1}</span><span>PDF · 2 PAGES</span></div>
  <div className="resume-showcase-paper" aria-hidden="true"><div className="resume-showcase-paper-inner"><FileText size={26} strokeWidth={1.5}/><span>SP / 0{i+1}</span><i/><i/><i/><i/></div></div>
  <div className="resume-showcase-card-content"><span className="resume-showcase-index">0{i+1}<small> / 03</small></span><h3>{resume.title}</h3><p>{resume.description}</p><ResumeActions slug={resume.slug}/></div>
 </article>)}</div>
 <div className="resume-showcase-foot"><span>AVAILABLE TO VIEW OR DOWNLOAD</span><span>SELECT A PATH ABOVE ↗</span></div>
 </section>}
export function DirectContact(){return <div className="direct-contact"><a className="contact-whatsapp" href="https://wa.me/919904491017" target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/>Chat on WhatsApp<ArrowUpRight size={16}/></a><a href="mailto:sanket2742003@gmail.com"><Mail size={19}/>Send an email<ArrowUpRight size={16}/></a></div>}
