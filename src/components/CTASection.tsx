"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-r from-culinairy-darkTeal to-culinairy-darkBlue rounded-3xl mx-auto max-w-6xl my-12 border border-culinairy-teal/30">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl leading-tight text-white dark:text-white">
          Stop spending hours planning<br />your weekly meals
        </h2>
        <p className="text-culinairy-lightGray mb-8 max-w-xl">
          Save up to 2 hours weekly while enjoying healthier, budget-friendly meals
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-culinairy-teal"
              required
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-culinairy-teal hover:bg-culinairy-lightTeal rounded-full text-white px-12 py-5 h-auto text-xl font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist →'}
            </Button>
          </div>
          {message && (
            <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default CTASection;
