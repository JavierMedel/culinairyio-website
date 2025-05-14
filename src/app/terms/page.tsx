import React from 'react';
import HeaderWithTransparency from '@/components/HeaderWithTransparency';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - CulinAIry.io',
  description: 'Terms of Service for CulinAIry.io - Smart AI-Powered Meal Planning'
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200">
      <HeaderWithTransparency showNav={false} showWaitlist={false} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-white">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: 3/24/2025</p>
        
        <div className="space-y-8">
          <section>
            <p className="mb-4">
              Welcome to CulinAIry.io (the "Service"), operated by CulinAIry.io ("Company," "we," "us," or "our"). 
              By accessing or using our Service, you agree to these Terms of Service ("Terms"). 
              If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">1. Use of the Service</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">1.1. Eligibility</h3>
            <p className="mb-4">
              You must be at least 18 years old and legally able to enter into contracts to use our Service.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">1.2. License</h3>
            <p className="mb-4">
              We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Service for its intended purpose.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">1.3. Prohibited Activities</h3>
            <p className="mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for unlawful purposes.</li>
              <li>Attempt to reverse-engineer, copy, or modify our software.</li>
              <li>Interfere with or disrupt the Service.</li>
              <li>Use the Service to harass or harm individuals.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">2. Waitlist and Data Collection</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">2.1. Waitlist Registration</h3>
            <p className="mb-4">
              By joining the waitlist, you provide your email address and consent to receiving updates about the Service.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">2.2. Data Usage</h3>
            <p className="mb-4">
              We collect and store your email for notification purposes. We do not sell or share your email with third parties without your consent.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">2.3. Opt-Out</h3>
            <p className="mb-4">
              You can unsubscribe at any time by clicking the "unsubscribe" link in our emails.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">3. Intellectual Property</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">3.1. Ownership</h3>
            <p className="mb-4">
              All rights, title, and interest in the Service, including trademarks, content, and software, remain with us.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">3.2. Restrictions</h3>
            <p className="mb-4">
              You may not use our branding, logos, or other proprietary materials without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">4. Disclaimers and Limitation of Liability</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">4.1. No Warranty</h3>
            <p className="mb-4">
              The Service is provided "as is" without warranties of any kind, express or implied.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">4.2. Limitation of Liability</h3>
            <p className="mb-4">
              We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">5. Termination</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">5.1. Breach</h3>
            <p className="mb-4">
              We reserve the right to terminate or suspend your access if you violate these Terms.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">5.2. Effect of Termination</h3>
            <p className="mb-4">
              Upon termination, your right to use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">6. Changes to These Terms</h2>
            <p className="mb-4">
              We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">7. Governing Law & Disputes</h2>
            <p className="mb-4">
              These Terms are governed by the laws of California, United States. Any disputes will be resolved in the courts of California.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">8. Contact Information</h2>
            <p className="mb-4">
              For questions, contact us at: <a href="mailto:support@culinairy.io" className="text-culinairy-teal hover:underline">support@culinairy.io</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full py-6 px-4 border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CulinAIry.io. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <a
              href="mailto:hello@culinairy.ai"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;