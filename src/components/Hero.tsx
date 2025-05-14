"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const images = [
    '/images/culinAIry-image-01.jpeg',
    '/images/culinAIry-image-02.png',
    '/images/culinAIry-image-03.png',
    '/images/culinAIry-image-04.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <section className="w-full py-12 md:py-24 pt-16 flex flex-col items-center justify-center text-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/70 text-culinairy-lightGray mb-6">
        Effortless AI Meal Planning.
        </div>
        <motion.h1 
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-culinairy-teal to-culinairy-cyan max-w-4xl mb-4"
        >
          CulinAIry.io – Effortless AI Meal Planning,<br />Picture It. Cook It. Enjoy It.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="dark:text-culinairy-lightGray text-culinairy-darkTeal max-w-xl mx-auto mb-8 text-lg font-medium"
        >
          Ditch the meal-planning stress! Get optimized recipes, step-by-step visual guides, and auto-generated shopping lists—all powered by AI to match your taste and preferences. Turn everyday cooking into a seamless, fun, and inspiring experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <Button variant="default" size="lg" className="mt-6">
            Get Started
          </Button>
        </motion.div>
        <div className="mt-12 w-full max-w-4xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={images[currentImageIndex]}
                alt={`CulinAIry Dashboard ${currentImageIndex + 1}`}
                width={1200}
                height={675}
                className="rounded-lg border border-gray-800 shadow-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
