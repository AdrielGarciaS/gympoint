import React, { useEffect } from 'react';

export default function InfinityScoll({ loadMore }) {
  function handleScroll() {
    if (
      document.documentElement.clientHeight +
        document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      loadMore();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
