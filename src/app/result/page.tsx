import { Suspense } from 'react';

import ResultPageClient from './client-page';

export default function ResultPage() {
  return (
    // we need it to avoid suspense boundary error from next.js during the build.
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPageClient />
    </Suspense>
  );
}
