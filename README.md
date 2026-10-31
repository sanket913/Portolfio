# Sanket Prajapati — Portfolio

The project root is `D:\portfolio`. This is a Next.js and TypeScript portfolio with a static export, three professional profile routes and fifteen project detail routes. Publishing is left to Sanket; pushing this repository alone does not start a new Vercel deployment unless the repository is already connected there.

## Run locally

```powershell
cd D:\portfolio
npm install
npm run dev
```

Open http://127.0.0.1:3000. `npm run build` produces `out/`; `npm run typecheck` checks TypeScript separately. No API key or backend is required.

## Design and content

`src/components/PortfolioHomeV3.tsx` and `src/app/portfolio-v3.css` define the current portfolio. The opening scene in `src/app/hero-premiere.css` uses Sanket's original portrait in a layered 3D frame; its elements respond to scroll progress without changing native scroll speed. The Selected Work gallery in `src/app/selected-work.css` presents three original project photos beside a sticky guide and active-project progress indicator. The Person story in `src/app/person-story.css` pairs an original working photo with a scroll-aware education timeline. `src/app/experience-cinema.css` presents two internships as scroll-aware chapters, `src/app/resume-showcase.css` presents three downloadable PDFs as a document gallery, and `src/app/contact-paper.css` presents contact actions on a torn-paper invitation. The rest of the site moves into light aubergine and ivory, with three professional practice cards, project case studies and a photo journal. `src/components/ScrollFilmDirector.tsx` and `src/app/scroll-film.css` turn the full page into a sequence of photographic chapter frames: scrolling forward plays each frame, scrolling backward reverses it, and the frame clears to reveal readable interactive content. They also coordinate chapter tracking, scene-opening masks, typographic reveals and photo parallax without changing native scroll distance. Reduced-motion settings disable scroll animation. `src/components/AppShell.tsx` and `src/app/navigation.css` provide the floating desktop navigation, compact touch menu and iPhone-style bottom dock. `src/app/footer-cinema.css` defines the animated editorial footer and its mobile layout.

Typography uses a locally served variable **Inter** font (`public/fonts/inter-latin.woff2`) with its SIL Open Font License (`public/fonts/OFL-Inter.txt`). [Odoo's official brand typography guidance](https://www.odoo.com/page/brand-assets) specifies Inter for headings and body copy; this portfolio uses that typographic direction without copying Odoo branding. The shared wordless mark is `public/brand/mark-v2.svg` and is also used for the browser icon.

`src/components/Experience.tsx` provides the profile and project routes. Five project pages use original supplied project photographs; the other projects use clearly labeled concept illustrations. `src/components/PhotoJournal.tsx` presents fourteen original photographs with an accessible viewer. Certificates establish participation only, and unverified source code, role details, outcomes and metrics are not claimed.

Three supplied PDFs are copied without changes to `public/resumes/`. Visitors can view or download each, and can contact Sanket via WhatsApp or email. These links open the visitor's chosen app; the site does not send messages automatically.

## Deploy on Vercel

1. Sign in to [Vercel](https://vercel.com/) with GitHub, choose **Add New → Project**, and import [`sanket913/Portolfio`](https://github.com/sanket913/Portolfio).
2. Keep the repository root as the Root Directory. The project uses the **Next.js** preset, `npm run build`, and the static `out` directory; these settings are also declared in `vercel.json`.
3. In Project Settings → Environment Variables, keep **Automatically expose System Environment Variables** enabled so Vercel supplies `VERCEL_PROJECT_PRODUCTION_URL` for the sitemap and metadata. For a custom domain, optionally set `NEXT_PUBLIC_SITE_URL` to the full production URL, such as `https://your-domain.com`, for Production and redeploy.
4. Select **Deploy**, then verify the homepage, one profile, one project, a resume PDF, WhatsApp/email links, and `/sitemap.xml` at the resulting URL. Connecting the repository makes later pushes to the production branch deploy automatically.

## Verification

After `npm run build`, run `node scripts/preview.mjs`, then `node scripts/cinematic-check.mjs` and `node scripts/production-check.mjs` for browser checks. The cinematic suite checks the scroll scenes across desktop, tablet, phone and reduced-motion settings. The production suite crawls every generated route and internal link, checks local assets and PDFs, and exercises the photo viewer, copy-email control and mobile navigation. The browser scripts use Playwright; cinematic screenshots and results go to ignored `qa/`. Set `PORTFOLIO_CHROME_PATH` when Chromium is installed outside Playwright's default location.
