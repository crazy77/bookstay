'use client';

import { useEffect } from 'react';

export function VisitTracker() {
  useEffect(() => {
    const body = JSON.stringify({ path: window.location.pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/visits', new Blob([body], { type: 'application/json' }));
      return;
    }
    void fetch('/api/visits', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    });
  }, []);

  return null;
}
