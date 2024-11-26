import React from 'react';
import { City } from '@/constants/cities'; 
import Link from 'next/link'; // Import Link for navigation
import Image from 'next/image';

interface CityCardProps {
  city: City; // Expecting a city object as a prop
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link 
      href={`/cities/${city.id}`} 
      className="relative flex items-center cursor-pointer" 
      aria-label={`Learn more about services in ${city.name}`} // Added aria-label for accessibility
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-80 lg:h-52"> {/* Make image bigger on large screens */}
        <Image
          src={`https://res.cloudinary.com/dcrue4vr6/image/upload/v1729459742/${city.id}.jpg`}
          alt={`Image of ${city.name}`} // Descriptive alt text
          layout="fill" // Use fill layout to make the image fill its parent
          className="rounded-2xl object-cover" // Maintain aspect ratio and cover the area
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="border-l-2 border-black h-40 mx-10" /> {/* Horizontal margin for spacing */}
      <div className="flex flex-col p-4"> {/* Add padding to the text section */}
        <h3 className="text-6xl text-black mt-4">
          {city.name}
        </h3>
      </div>
    </Link>
  );
};

export default CityCard;
