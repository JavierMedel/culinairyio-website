"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CulinAIryioLogo from './CulinAIryioLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useShoppingCart } from './ShoppingCartContext';

interface HeaderWithTransparencyProps {
  showNav?: boolean;
  showWaitlist?: boolean;
  backLink?: string;
  backLinkText?: string;
}

const HeaderWithTransparency = ({
  showNav = true,
  showWaitlist = true,
  backLink,
  backLinkText
}: HeaderWithTransparencyProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll direction and visibility
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      
      // Update scroll state
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`w-full py-1 px-2 md:px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b dark:border-gray-800 border-culinairy-teal ${isScrolled 
        ? 'dark:bg-gradient-to-r dark:from-culinairy-darkTeal/90 dark:to-culinairy-darkBlue/90 bg-gradient-to-r from-white/90 to-culinairy-lightGray/30 backdrop-blur-sm shadow-lg' 
        : 'dark:bg-gradient-to-r dark:from-culinairy-darkTeal dark:to-culinairy-darkBlue bg-gradient-to-r from-white to-culinairy-lightGray/50'} ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container mx-auto px-2 md:px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <CulinAIryioLogo />
          </Link>
          {backLink && backLinkText && (
            <Link href={backLink} className="text-culinairy-teal hover:text-culinairy-cyan transition-colors inline-flex items-center ml-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {backLinkText}
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Shopping Cart Icon */}
          <ShoppingCartNavIcon />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

// Shopping Cart Icon with Badge Component
const ShoppingCartNavIcon = () => {
  const [count, setCount] = useState(0);
  const { shoppingCart } = useShoppingCart();
  
  // Update count after initial render to avoid hydration mismatch
  useEffect(() => {
    setCount(shoppingCart.length);
  }, [shoppingCart.length]);
  
  return (
    <Link href="/shopping-list" aria-label="View shopping list" className="relative flex items-center">
      <span role="img" aria-label="Shopping Cart" className="text-2xl">🛒</span>
      {count > 0 && (
        <span
          aria-label={`${count} recipes in shopping cart`}
          className="absolute -top-2 -right-2 bg-culinairy-teal text-white text-xs font-bold rounded-full px-2 py-0.5 border border-white dark:border-gray-900"
        >
          {count}
        </span>
      )}
    </Link>
  );
};

export default HeaderWithTransparency;