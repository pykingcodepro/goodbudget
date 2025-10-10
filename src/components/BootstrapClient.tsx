'use client'; // Mark as a client component if using App Router

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js' as any); // Import Bootstrap's JS bundle
  }, []);
  return null;
}