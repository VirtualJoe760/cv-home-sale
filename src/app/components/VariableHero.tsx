import React from 'react';
import Image from 'next/image'; // If feasible for background optimization

interface VariableHeroProps {
  backgroundImage: string;
  serviceName: string;
  description: string;
}

const VariableHero: React.FC<VariableHeroProps> = ({ backgroundImage, serviceName, description }) => {
  return (
    <>
      <div
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage}), url('/path-to-low-quality-placeholder.jpg')`,
        }}
        aria-label={`Background hero image for ${serviceName}`}
      >
        {/* Fallback Image for performance */}
        <Image
          src={backgroundImage}
          alt={`Hero image for ${serviceName}`}
          fill
          priority
          className="absolute inset-0 object-cover"
        />

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">{serviceName}</h1>
          <p className="mt-4 max-w-lg mx-auto text-lg sm:text-xl lg:text-2xl">{description}</p>
        </div>
      </div>
    </>
  );
};

export default VariableHero;
