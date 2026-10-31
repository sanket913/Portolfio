const configured=process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelDomain=process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;

export const siteOrigin=configured
 ? new URL(/^https?:\/\//i.test(configured)?configured:`https://${configured}`).origin
 : vercelDomain?`https://${vercelDomain}`:'http://localhost:3000';
