"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  imageComponent?: React.ReactNode;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  imageComponent,
  className = ""
}: FeatureCardProps) => {
  return (
    <Card className={`overflow-hidden border-gray-800 hover:border-culinairy-teal/50 transition-all shadow-lg ${className}`}>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="w-full"
        >
          <CardHeader className="pb-2">
            {imageComponent ? (
              <div className="mb-4">{imageComponent}</div>
            ) : icon ? (
              <div className="mb-4">
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
            ) : null}
            <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-culinairy-lightGray">{description}</p>
          </CardContent>
        </motion.div>
      </AuroraBackground>
    </Card>
  );
};

export default FeatureCard;
