import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 border-t border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top navigation links */}
        <div className="flex items-center space-x-8 mb-6 text-sm">
          <Link href="/about" className="text-culinairy-lightGray hover:text-white transition-colors">
            About
          </Link>
          <a
            href="mailto:hello@culinairy.io"
            className="text-culinairy-lightGray hover:text-white transition-colors"
          >
            Contact
          </a>
          <Link href="/privacy" className="text-culinairy-lightGray hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-culinairy-lightGray hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
        
        {/* Social media icons */}
        <div className="flex items-center space-x-6 mb-6">
          {/* Twitter, Instagram, Facebook icons */}
        </div>
        
        {/* Copyright text */}
        <div className="text-gray-500 text-sm">
          ©{currentYear} CulinAIry.io
        </div>
      </div>
    </footer>
  );
};

export default Footer;
