"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-culinairy-darkTeal to-culinairy-darkBlue">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">404 - Page Not Found</h1> {/* Increased mb-4 to mb-8 */}
      <p className="text-lg md:text-xl text-gray-200 mb-12 text-center"> {/* Increased mb-8 to mb-12 */}
        Oops! We couldn't find the page you're looking for.
      </p>
      <Link
        href="/recipes"
        className="px-6 py-3 bg-culinairy-teal hover:bg-culinairy-teal/80 text-white rounded-lg transition-colors" /* Removed mr-4 as buttons are stacked */
      >
        Browse Recipes
      </Link>
      <Link
        href="/"
        className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors mt-4" /* Added mt-4 */
      >
        Go Home
      </Link>
    </div>
  );
}
