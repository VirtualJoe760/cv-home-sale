// utils/initializeBuyingBuddy.ts

interface MBBConfig {
    seo: string;
    data: {
      acid: string;
    };
    googleMaps?: boolean;
  }
  
  // Extend the Window interface to include MBB and mbbMapLoaded properties
  declare global {
    interface Window {
      MBB?: MBBConfig;
      mbbMapLoaded?: () => void;
    }
  }
  
  export function initializeBuyingBuddy(): void {
    // Initialize the MBB configuration on the window object
    window.MBB = {
      seo: "false",
      data: {
        acid: "yA6k2Yfb",
      },
    };
  
    // Define the callback function for Google Maps loading
    window.mbbMapLoaded = () => {
      if (window.MBB) {
        window.MBB.googleMaps = true;
      }
    };
  
    // Helper function to dynamically load external scripts
    const loadScript = (src: string, isAsync: boolean = true) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = isAsync;
      document.head.appendChild(script);
    };
  
    // Load Buying Buddy scripts and Google Maps API in sequence
    loadScript("https://www.mbb2.com/version3/css/theme/acid/yA6k2Yfb", false);
    loadScript("https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places&key=YOUR_GOOGLE_MAPS_API_KEY", false);
    loadScript("https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz");
  }
  