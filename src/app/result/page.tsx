import { Suspense } from 'react';

import Loader from '@/components/ui/loader';

import ResultPageClient from './client-page';

export default function ResultPage() {
  return (
    // we need it to avoid suspense boundary error from next.js during the build.
    <Suspense fallback={<Loader />}>
      <ResultPageClient />
    </Suspense>
  );
}
