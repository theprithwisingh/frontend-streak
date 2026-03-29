/*
1. Page render hota hai
2. sentinel (bottom div) DOM me attach hota hai
3. IntersectionObserver usko observe karta hai
4. User scroll karta hai
5. Sentinel viewport me aata hai
6. handleObserver trigger hota hai
7. condition check hoti hai
8. loadMore() call hota hai
9. new data append hota hai
10. sentinel niche shift ho jata hai
11. cycle repeat
*/
import { useEffect, useRef, useCallback } from "react";
export const useInfiniteScroll = ({
  loadMore,
  hasMore,
  loading,
}) => {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      console.log(target)

      if (target.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px", // prefetch early
      threshold: 0,
    });

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [handleObserver]);

  return sentinelRef;
};