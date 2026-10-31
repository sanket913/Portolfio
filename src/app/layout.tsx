import type { Metadata, Viewport } from 'next';
import { NavigationScroll } from '@/components/NavigationScroll';
import { siteOrigin } from '@/lib/site-url';
import './globals.css';
import './responsive.css';
import './film.css';
import './typography.css';
import './portfolio-v3.css';
import './navigation.css';
import './readability.css';
import './hero-premiere.css';
import './selected-work.css';
import './person-story.css';
import './experience-cinema.css';
import './resume-showcase.css';
import './contact-paper.css';
import './footer-cinema.css';
import './scroll-film.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: 'Sanket Prajapati — Developer & AI Researcher', template: '%s | Sanket Prajapati' },
  description: 'Full-stack development, data analytics and intelligent systems. The portfolio of Sanket Prajapati, based in Vadodara, India.',
  manifest: '/site.webmanifest',
  appleWebApp: { capable: true, title: 'Sanket', statusBarStyle: 'black-translucent' },
  other: { 'apple-mobile-web-app-capable': 'yes' },
  icons: { icon: [{url:'/brand/mark-v2.svg',type:'image/svg+xml'},{url:'/brand/favicon-v2.png',sizes:'32x32',type:'image/png'}], shortcut:'/brand/favicon-v2.png', apple:'/brand/apple-touch-v2.png' },
  openGraph: { title: 'Sanket Prajapati — Building at the intersection', description: 'Explore my worlds of development, data and artificial intelligence.', type: 'website' },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = {themeColor:'#fbf9f7',width:'device-width',initialScale:1,viewportFit:'cover'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><NavigationScroll/>{children}</body></html>}
