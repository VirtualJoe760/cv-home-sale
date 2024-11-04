"use client";

import React, { useContext, useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { carouselData } from "@/constants/carouselData";
import { LogoContext } from "@/app/layout";

const CarouselHero: React.FC = () => {
  const logo = useContext(LogoContext); // Access the theme-based logo from context

  // Carousel state and logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const images = carouselData.images;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative isolate overflow-hidden">
      {/* Layered images for cross-fade */}
      <div className="absolute inset-0 z-0">
        {/* Current Image */}
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 opacity-100 transition-opacity duration-1000 ease-in-out"
          loading="eager" // Ensure no lazy-loading flicker for hero images
        />
        {/* Next Image */}
        <Image
          src={images[nextIndex].src}
          alt={images[nextIndex].alt}
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          loading="eager"
        />
      </div>

      {/* Dark Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          {/* Logo */}
          <Image
            src={logo}
            alt="Logo representing Coachella Valley Handyman"
            width={72}
            height={72}
            loading="eager"
          />

          {/* Heading */}
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {carouselData.heading}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-white">
            {carouselData.description}
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href={carouselData.ctaOne.href}
              className="button scroll-smooth px-3.5 py-2.5 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label={carouselData.ctaOne.ariaLabel}
            >
              {carouselData.ctaOne.text}
            </Link>
            <Link
              href={carouselData.ctaTwo.href}
              className="text-sm text-white hover:text-gray-300"
              aria-label={carouselData.ctaTwo.ariaLabel}
            >
              {carouselData.ctaTwo.text} <ChevronRightIcon className="inline h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselHero;
