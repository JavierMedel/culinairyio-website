import React from 'react';
import Image from 'next/image';

const MicrosoftStartupsSection = () => {
  return (
    <section className="w-full py-8 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-culinairy-lightGray text-sm mb-3">Proudly supported by</p>
        <div className="relative h-32 w-96">
          <Image
            src="/images/microsoft-startups-logo.png"
            alt="Microsoft for Startups"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MicrosoftStartupsSection;