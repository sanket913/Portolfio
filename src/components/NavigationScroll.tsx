'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

// Lives in the persistent root layout so route changes do not lose the history signal.
export function NavigationScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname.replace(/\/$/, '') || '/');
  const restoringHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      const destination = window.location.pathname.replace(/\/$/, '') || '/';
      restoringHistory.current = destination !== previousPath.current;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useLayoutEffect(() => {
    const nextPath = pathname.replace(/\/$/, '') || '/';
    if (nextPath === previousPath.current) return;
    const backOrForward = restoringHistory.current;
    restoringHistory.current = false;
    previousPath.current = nextPath;
    // Hash links and history traversal keep the browser/Next.js scroll behavior.
    if (!backOrForward && !window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
