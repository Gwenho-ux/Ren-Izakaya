'use client';

import React, { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {

  return (
    <>
      {children}
    </>
  );
} 