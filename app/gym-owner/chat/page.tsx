'use client';

import { Suspense } from 'react';

import ChatPageContent from './chat-content';

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatPageContent />
    </Suspense>
  );
}
