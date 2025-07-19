'use client';

import { SimpleSoundProvider } from '@/contexts/SimpleSoundContext';
import { MainLayout } from './layouts/MainLayout';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SimpleSoundProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </SimpleSoundProvider>
  );
} 