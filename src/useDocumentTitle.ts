import { useEffect } from 'react';

/** Sets the tab title for the current page. */
export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
