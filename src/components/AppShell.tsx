'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUp, ArrowUpRight, FileText, FolderOpen, House, Layers3, Menu, Send, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const tabs = [
  { id: 'home', label: 'Home', href: '/#main', icon: House },
  { id: 'profiles', label: 'Profiles', href: '/#profiles', icon: Layers3 },
  { id: 'work', label: 'Work', href: '/#work', icon: FolderOpen },
  { id: 'resumes', label: 'Resumes', href: '/#resumes', icon: FileText },
  { id: 'contact', label: 'Contact', href: '/#contact', icon: Send },
];
const mainLinks = [
  { id: 'about', label: 'My story', href: '/#about' },
  { id: 'profiles', label: 'Expertise', href: '/#profiles' },
  { id: 'work', label: 'Selected work', href: '/#work' },
  { id: 'resumes', label: 'Resumes', href: '/#resumes' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [section, setSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const currentSection = pathname.startsWith('/profiles/') ? 'profiles' : pathname.startsWith('/projects/') ? 'work' : section;
  const active = currentSection === 'about' ? 'home' : currentSection === 'experience' ? 'resumes' : currentSection;

  useEffect(() => {
    let scheduled = 0;
    const update = () => {
      scheduled = 0;
      setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
      if (pathname !== '/') return;
      let current = 'home';
      let mostRecentTop = -Infinity;
      for (const id of ['about', 'profiles', 'work', 'experience', 'resumes', 'contact']) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= innerHeight * .38 && el.getBoundingClientRect().top > mostRecentTop) {
          mostRecentTop = el.getBoundingClientRect().top;
          current = id;
        }
      }
      setSection(current);
    };
    const onScroll = () => { if (!scheduled) scheduled = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(scheduled);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = matchMedia('(min-width: 1200px) and (pointer: fine)').matches;
    const context = gsap.context(() => {
      // Keep touch layouts readable immediately; desktop retains the cinematic reveals.
      if (!reduced && desktop) gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, { y: 38, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      if (!reduced) {
        gsap.fromTo('.footer-cinema-line-inner', { yPercent: 48, opacity: .55 }, { yPercent: 0, opacity: 1, stagger: .13, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.footer-cinema', start: 'top 88%', once: true } });
        gsap.fromTo('.footer-cinema-rule span', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.footer-cinema', start: 'top 78%', end: 'bottom bottom', scrub: .6 } });
      }
    });
    return () => { context.revert(); };
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus(); }
      if (event.key === 'Tab') {
        const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('#main-menu a[href]'));
        const controls = [...links, menuButton.current].filter((element): element is HTMLAnchorElement | HTMLButtonElement => Boolean(element));
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLAnchorElement))) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement as HTMLAnchorElement))) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.querySelector<HTMLAnchorElement>('#main-menu a[href]')?.focus();
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <header className={`header nav-shell${menu ? ' nav-shell-open' : ''}`}>
      <Link href="/" className="nav-brand" aria-label="Sanket Prajapati home" onClick={() => setMenu(false)}><span className="brand brand-symbol"><img src="/brand/mark-v2.svg" alt="" width="44" height="44"/></span><span className="nav-brand-copy"><strong>Sanket.</strong><small>DEVELOPER / DATA / AI</small></span></Link>
      <nav id="main-menu" aria-label="Main navigation" className={menu ? 'nav nav-sheet open' : 'nav nav-sheet'}>
        <div className="nav-sheet-top"><span>EXPLORE THE PORTFOLIO</span><span>01 — 05</span></div>
        {mainLinks.map(({id,label,href},i) => <Link key={id} href={href} aria-current={currentSection===id?'location':undefined} onClick={() => {setMenu(false);setSection(id)}}><span className="nav-link-index">0{i+1}</span><span className="nav-link-title">{label}</span><ArrowUpRight className="touch-menu-arrow" size={18}/></Link>)}
        <div className="nav-sheet-foot"><span>CURIOUS ABOUT WORKING TOGETHER?</span><Link href="/#contact" onClick={() => setMenu(false)}>Get in touch <ArrowUpRight size={16}/></Link></div>
      </nav>
      <div className="nav-end"><span className="nav-availability"><i/> OPEN TO OPPORTUNITIES</span><Link href="/#contact" className="nav-contact" onClick={() => setMenu(false)}><span>Let&apos;s talk</span><ArrowUpRight size={17}/></Link><button ref={menuButton} className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-controls="main-menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
    </header>
    {menu && <button className="nav-scrim" aria-label="Close menu" onClick={() => {setMenu(false);menuButton.current?.focus()}}/>}
    {children}
    <footer className="footer-cinema" aria-label="Portfolio footer">
      <div className="footer-cinema-glow" aria-hidden="true"/>
      <div className="footer-cinema-top"><span><i/> MADE WITH CURIOSITY <b>/</b> VADODARA, INDIA</span><span>THE END OF THE PAGE. THE START OF WHAT&apos;S NEXT.</span></div>
      <div className="footer-cinema-main"><Link className="footer-cinema-wordmark" href="/" aria-label="Sanket Prajapati home"><span className="footer-cinema-line"><span className="footer-cinema-line-inner">SANKET</span></span><span className="footer-cinema-line"><span className="footer-cinema-line-inner">PRAJAPATI<span className="footer-cinema-dot">.</span></span></span></Link><a href="#main" className="footer-cinema-up" aria-label="Back to top"><ArrowUp size={28}/><span>BACK<br/>TO TOP</span></a></div>
      <div className="footer-cinema-rule" aria-hidden="true"><span/></div>
      <div className="footer-cinema-bottom"><div className="footer-cinema-description"><strong>Development. Data. Discovery.</strong><span>Building useful things, one question at a time.</span></div><nav className="footer-cinema-links" aria-label="Footer links"><a href="https://github.com/sanket913" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16}/></a><a href="https://www.linkedin.com/in/sanket-prajapati27/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a><a href="mailto:sanket2742003@gmail.com">Email <ArrowUpRight size={16}/></a><a href="https://wa.me/919904491017" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={16}/></a></nav><span className="footer-cinema-copyright">© {new Date().getFullYear()} SANKET PRAJAPATI</span></div>
    </footer>
    <nav className="app-tabbar" aria-label="Portfolio tabs">
      {tabs.map(({ id, label, href, icon: Icon }) => <Link key={id} href={href} aria-current={active === id ? 'location' : undefined} onClick={() => { setMenu(false); setSection(id); }}><span className="tab-icon"><Icon size={20} strokeWidth={active === id ? 2 : 1.8} /></span><span className="tab-label">{label}</span><i className="tab-current" aria-hidden="true"/></Link>)}
    </nav>
  </>;
}
