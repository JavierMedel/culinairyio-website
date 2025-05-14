"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CulinAIryioLogo from './CulinAIryioLogo';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      className={`w-full py-3 px-3 md:px-6 flex items-center justify-between border-b border-culinairy-teal fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled 
        ? 'bg-gradient-to-r from-culinairy-darkTeal/90 to-culinairy-darkBlue/90 backdrop-blur-sm' 
        : 'bg-gradient-to-r from-culinairy-darkTeal to-culinairy-darkBlue'}`}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
      <img src="/images/logo.png" alt="Website Logo" className="h-20" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center justify-center space-x-6 mr-4 text-white dark:text-white text-culinairy-darkBlue">
          <Link
            href="/recipes"
            className="hover:text-culinairy-teal transition-colors cursor-pointer font-medium"
          >
            Recipes
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
