import {chromium} from 'playwright';
import {readdir} from 'node:fs/promises';

const origin=process.env.PORTFOLIO_PREVIEW_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({headless:true,executablePath:process.env.PORTFOLIO_CHROME_PATH,args:['--use-angle=swiftshader']});
const failures=[];
const checks=[];
const assert=(condition,label)=>{checks.push(label);if(!condition)failures.push(label)};
const pages=['/',...(await readdir('out/profiles',{withFileTypes:true})).filter(item=>item.isDirectory()).map(item=>`/profiles/${item.name}/`),...(await readdir('out/projects',{withFileTypes:true})).filter(item=>item.isDirectory()).map(item=>`/projects/${item.name}/`)];
const targets=new Set();
const fragments=[];
const pageErrors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write']});
 page.on('pageerror',error=>pageErrors.push(error.message));
 for(const route of pages){
  const response=await page.goto(origin+route,{waitUntil:'domcontentloaded'});
  assert(response?.status()===200,`${route} returns HTTP 200`);
  assert(await page.locator('h1').count()===1,`${route} has one primary heading`);
  const audit=await page.evaluate(()=>({links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.getAttribute('href'),label:(a.getAttribute('aria-label')||a.textContent||'').trim()})),buttons:[...document.querySelectorAll('button')].map(button=>({label:(button.getAttribute('aria-label')||button.textContent||'').trim()})),images:[...document.querySelectorAll('img[src]')].map(img=>img.getAttribute('src'))}));
  for(const link of audit.links){
   assert(Boolean(link.label),`${route} link ${link.href} has an accessible name`);
   const url=new URL(link.href,origin+route);
   if(url.origin===origin){targets.add(url.pathname);if(url.hash)fragments.push({route,path:url.pathname,hash:decodeURIComponent(url.hash.slice(1))})}
   else assert(['https:','mailto:','tel:'].includes(url.protocol),`${route} external link ${link.href} has a usable protocol`);
  }
  for(const button of audit.buttons)assert(Boolean(button.label),`${route} button has an accessible name`);
  for(const image of audit.images)targets.add(new URL(image,origin+route).pathname);
 }
 for(const target of targets){const response=await page.request.get(origin+target);assert(response.status()===200,`${target} resolves`)}
 const ids=new Map();
 for(const path of [...new Set(fragments.map(item=>item.path))]){
  await page.goto(origin+path,{waitUntil:'domcontentloaded'});
  ids.set(path,new Set(await page.locator('[id]').evaluateAll(elements=>elements.map(element=>element.id))));
 }
 for(const {route,path,hash} of fragments)assert(ids.get(path)?.has(hash),`${route} links to existing ${path}#${hash}`);

 await page.goto(origin,{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'View Sentinel participation',exact:true}).click();
 assert(await page.getByRole('dialog').isVisible(),'Photo viewer opens');
 const first=await page.locator('.photo-dialog-foot h3').innerText();
 await page.getByRole('button',{name:'Next photograph'}).click();
 assert((await page.locator('.photo-dialog-foot h3').innerText())!==first,'Photo viewer next button changes photo');
 await page.getByRole('button',{name:'Previous photograph'}).click();
 assert((await page.locator('.photo-dialog-foot h3').innerText())===first,'Photo viewer previous button changes photo');
 await page.getByRole('button',{name:'Close photograph'}).click();
 assert(!(await page.getByRole('dialog').isVisible()),'Photo viewer close button works');
 await page.getByRole('button',{name:'Copy email address'}).click();
 await page.locator('.copy-status').getByText('Copied!').waitFor({timeout:3000});
 assert((await page.locator('.copy-status').innerText())==='Copied!','Copy email button reports success');
 assert((await page.evaluate(()=>navigator.clipboard.readText()))==='sanket2742003@gmail.com','Copy email button writes the correct address');
 for(const file of ['Sanket-Prajapati-Full-Stack.pdf','Sanket-Prajapati-Data-Analyst.pdf','Sanket-Prajapati-AI-Research.pdf']){
  const response=await page.request.get(`${origin}/resumes/${file}`);
  assert(response.status()===200&&Buffer.from(await response.body()).subarray(0,4).toString()==='%PDF',`${file} is a valid downloadable PDF`);
 }
 await page.goto(`${origin}/profiles/data-analytics/`,{waitUntil:'domcontentloaded'});
 assert((await page.locator('.relevant-experience').innerText()).includes('Data and analytics projects'),'Data profile shows relevant work');
 assert(!(await page.locator('.relevant-experience').innerText()).includes('ByteXL'),'Data profile does not claim the AI internship');
 await page.goto(`${origin}/projects/peoplepay360/`,{waitUntil:'networkidle'});
 await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:/Selected work/}).click();
 await page.waitForURL('**/#work');
 assert(await page.locator('#work').count()===1,'Detail navigation returns to Selected Work');
 assert(await page.getByRole('link',{name:'Chat on WhatsApp'}).getAttribute('href')==='https://wa.me/919904491017','WhatsApp button uses the direct contact number');
 assert(await page.getByRole('link',{name:'Send an email'}).getAttribute('href')==='mailto:sanket2742003@gmail.com','Email button opens the correct address');
 const phone=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 phone.on('pageerror',error=>pageErrors.push(error.message));
 await phone.goto(origin,{waitUntil:'networkidle'});
 await phone.getByRole('button',{name:'Open menu'}).click();
 assert(await phone.getByRole('navigation',{name:'Main navigation'}).isVisible(),'Mobile menu opens');
 assert(await phone.evaluate(()=>document.activeElement?.closest('#main-menu')!==null),'Mobile menu moves keyboard focus inside');
 await phone.keyboard.press('Shift+Tab');
 assert(await phone.evaluate(()=>document.activeElement?.getAttribute('aria-label')==='Close menu'),'Mobile menu traps reverse keyboard focus');
 await phone.keyboard.press('Tab');
 assert(await phone.evaluate(()=>document.activeElement?.closest('#main-menu')!==null),'Mobile menu traps forward keyboard focus');
 await phone.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:/Selected work/}).click();
 await phone.waitForURL('**/#work');
 assert(!(await phone.getByRole('navigation',{name:'Main navigation'}).isVisible()),'Mobile menu closes after navigation');
 await phone.getByRole('navigation',{name:'Portfolio tabs'}).getByRole('link',{name:'Resumes'}).click();
 await phone.waitForURL('**/#resumes');
 assert(await phone.locator('#resumes').count()===1,'Mobile Resumes tab reaches the resume section');
 await phone.getByRole('button',{name:'Open menu'}).click();
 await phone.keyboard.press('Escape');
 assert(!(await phone.getByRole('navigation',{name:'Main navigation'}).isVisible()),'Escape closes mobile menu');
 await phone.close();
 assert(pageErrors.length===0,`No browser runtime errors: ${pageErrors.join('; ')}`);
 await page.close();
}finally{
 await browser.close();
 console.log(JSON.stringify({routes:pages.length,checks:checks.length,failures},null,2));
}
if(failures.length)process.exitCode=1;
