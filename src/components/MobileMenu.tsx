'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  
  // Close menu when pathname changes (navigation occurs)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark-bg flex flex-col">
      <div className="flex justify-end p-4">
        <button 
          onClick={onClose}
          className="text-white focus:outline-none"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow gap-8 text-xl">
        <Link 
          href="/" 
          className={`transition-colors hover:text-neon-red ${
            pathname === '/' 
              ? 'text-neon-red' 
              : 'text-white'
          }`}
        >
          Home
        </Link>
        <Link 
          href="/wonders" 
          className={`transition-colors hover:text-neon-red ${
            pathname.includes('/wonders') 
              ? 'text-neon-red' 
              : 'text-white'
          }`}
        >
          Wonders
        </Link>
        <Link 
          href="/transition" 
          className={`transition-colors hover:text-neon-red ${
            pathname.includes('/transition') 
              ? 'text-neon-red' 
              : 'text-white'
          }`}
        >
          Transition
        </Link>
      </div>
    </div>
  );
}; 