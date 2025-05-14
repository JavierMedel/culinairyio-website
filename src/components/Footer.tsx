import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 border-t border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          © {currentYear} CulinAIry.io. All rights reserved.
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <Link href="/terms" className="text-culinairy-lightGray hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-culinairy-lightGray hover:text-white transition-colors">
            Privacy
          </Link>
          <a
            href="mailto:hello@culinairy.io"
            className="text-culinairy-lightGray hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
