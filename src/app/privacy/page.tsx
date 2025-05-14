import React from 'react';
import HeaderWithTransparency from '@/components/HeaderWithTransparency';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - CulinAIry.io',
  description: 'Privacy Policy for CulinAIry.io - Smart AI-Powered Meal Planning'
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200">
      <HeaderWithTransparency showNav={false} showWaitlist={false} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: 3/22/2025</p>
        
        <div className="space-y-8">
          <section>
            <p className="mb-4">
              CulinAIry.io ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and share information about you when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Information We Collect</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">1.1. Personal Information</h3>
            <p className="mb-4">
              When you join our waitlist or sign up for our Service, we collect your email address 
              and any other information you voluntarily provide with your explicit consent.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">1.2. Usage Data</h3>
            <p className="mb-4">
              We may collect information about how you interact with our Service, including IP address, 
              browser type, device information, and usage patterns.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">1.3. Cookies and Tracking Technologies</h3>
            <p className="mb-4">
              We use cookies to improve our Service and analyze traffic. You can manage cookie 
              preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Legal Basis for Data Processing</h2>
            <p className="mb-4">We process your personal data under the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consent</strong> – When you voluntarily provide your email to join our waitlist or register for our Service.</li>
              <li><strong>Legitimate Interest</strong> – To improve our Service, understand user preferences, and communicate relevant updates.</li>
              <li><strong>Contractual Obligation</strong> – When data is necessary to provide the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">How We Use Your Information</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">3.1. Service Operation</h3>
            <p className="mb-4">
              We use your email to notify you about updates, product launches, and relevant communications.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">3.2. Improvements</h3>
            <p className="mb-4">
              We analyze usage data to enhance our Service and provide a better experience.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">3.3. Legal Compliance</h3>
            <p className="mb-4">
              We may use or disclose your information if required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Sharing of Information</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">4.1. Third-Party Service Providers</h3>
            <p className="mb-4">
              We may share data with service providers assisting in email delivery, analytics, and infrastructure. 
              All third parties are required to comply with GDPR and have signed Data Processing Agreements (DPAs) with us.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">4.2. Legal Obligations</h3>
            <p className="mb-4">
              We may disclose information if necessary to comply with legal requirements or protect our rights.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">4.3. Business Transfers</h3>
            <p className="mb-4">
              In the event of a merger, acquisition, or asset sale, user data may be transferred.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">User Rights Under GDPR</h2>
            <p className="mb-4">Under the General Data Protection Regulation (GDPR), users have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access</strong> – Request a copy of the data we have about you.</li>
              <li><strong>Right to Rectification</strong> – Request correction of inaccurate personal data.</li>
              <li><strong>Right to Erasure</strong> – Request deletion of your data ("Right to be Forgotten").</li>
              <li><strong>Right to Restrict Processing</strong> – Request to limit how we process your data.</li>
              <li><strong>Right to Data Portability</strong> – Receive a copy of your data in a structured format.</li>
              <li><strong>Right to Object</strong> – Object to data processing based on legitimate interests.</li>
              <li><strong>Right to Withdraw Consent</strong> – Withdraw previously given consent at any time.</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@culinairy.io" className="text-culinairy-teal hover:underline">privacy@culinairy.io</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Data Security & Retention</h2>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">6.1. Security Measures</h3>
            <p className="mb-4">
              We implement technical and organizational security measures to protect your data. 
              However, no method of transmission over the internet is 100% secure.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-culinairy-teal">6.2. Data Retention</h3>
            <p className="mb-4">
              We retain your personal data only as long as necessary to fulfill its intended purpose, 
              unless a longer retention period is required by law. You may request deletion of your data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">International Data Transfers</h2>
            <p className="mb-4">
              If we transfer your data outside the European Economic Area (EEA), we implement appropriate safeguards, 
              such as Standard Contractual Clauses (SCCs), to protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Cookies & Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience. By using our Service, 
              you consent to our use of cookies unless you adjust your settings. Users can manage or disable 
              cookies through browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not intended for children under 18. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy. Continued use of the Service after changes constitutes 
              acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Contact Information & Data Protection Requests</h2>
            <p className="mb-4">
              For questions about this Privacy Policy or GDPR-related requests, contact us at: 
              <a href="mailto:privacy@culinairy.com" className="text-culinairy-teal hover:underline ml-1">privacy@culinairy.io</a>.
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

export default PrivacyPolicy;