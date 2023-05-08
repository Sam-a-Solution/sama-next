import * as React from 'react';

export default function useInfiniteScroll({
  rootRef,
  targetRef,
  onIntersect,
  threshold = 1.0,
  rootMargin = '20px',
  enabled,
}: {
  rootRef?: React.RefObject<HTMLElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}) {
  React.useEffect(() => {
    const root = rootRef?.current;
    const target = targetRef?.current;

    if (!enabled || !target) {
      return () => {
        return;
      };
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        }),
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [enabled, targetRef, rootRef, rootMargin, threshold, onIntersect]);
}
