'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { GymDetailContent } from './gym-detail-content';

export default function GymDetailPage() {
  const params = useParams();
  const gymId = params.id as string;

  return (
    <Suspense fallback={null}>
      <GymDetailContent gymId={gymId} />
    </Suspense>
  );
}
