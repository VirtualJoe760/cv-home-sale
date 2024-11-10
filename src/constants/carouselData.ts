
interface CarouselImage {
    src: string;
    alt: string;
  }
  
  interface CTA {
    text: string;
    href: string;
    ariaLabel: string;
  }
  
  export const carouselData = {
    // Array of images for the carousel
    images: [
      {
        src: "/images/city-images/coachella-valley.jpg",
        alt: "Description of first carousel image",
      },
      {
        src: "/images/city-images/palm-desert.jpg",
        alt: "Description of second carousel image",
      },
      {
        src: "/images/city-images/cathedral-city.jpg",
        alt: "Description of third carousel image",
      },
    ] as CarouselImage[],
  
    // Heading and description for the hero section
    heading: "The Best Resource For Real Estate In The Coachella Valley",
    description: "We provide trusted, professional real estate services throughout the Coachella Valley. Whether you're buying, selling, or investing, our team is here to guide you every step of the way to help you achieve your real estate goals.",
  
    // Call to Actions
    ctaOne: {
      text: "Sign Up",
      href: "/auth/sign-up",
      ariaLabel: "Login to your account",
    } as CTA,
    ctaTwo: {
      text: "See Listings",
      href: "/listings",
      ariaLabel: "Learn more about our services",
    } as CTA,
  };
  