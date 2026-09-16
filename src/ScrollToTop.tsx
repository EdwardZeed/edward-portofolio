import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on route change, since client-side navigation doesn't do this by default. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
