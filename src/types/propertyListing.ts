// types/propertyListing.ts

export interface Address {
    street: string;
    unit?: string;
    city: string;
    state: string;
    zip: string;
  }
  
  export interface Bathrooms {
    full: number;
    threeQuarter: number;
    half: number;
  }
  
  export interface HOA {
    fee: number;
    includes: string[];
    amenities: string[];
  }
  
  export interface Parking {
    carportSpaces: number;
    garageSpaces: number;
    coveredSpaces: number;
    totalSpaces: number;
  }
  
  export interface Pool {
    hasPool: boolean;
    features: string[];
    location: string;
  }
  
  export interface Features {
    parking: Parking;
    pool: Pool;
    view: string;
    gatedCommunity: boolean;
  }
  
  export interface Utilities {
    cooling: string[];
    heating: string[];
    waterHeater: string;
    laundry: string;
  }
  
  export interface TaxInfo {
    melloRoos: boolean;
  }
  
  export interface AdditionalInfo {
    shortTermRentalsAllowed: boolean;
    seniorCommunity: boolean;
    landType: string;
    tax: TaxInfo;
  }
  
  export interface ListingInfo {
    listPricePerSqFt: number;
    originalListPrice: number;
    listingDate: Date;
    terms: string[];
    possession: string;
  }
  
  export interface ContactInfo {
    agentName: string;
    agentEmail: string;
    agentPhone: string;
  }
  
  // Main Property Listing Interface
  export interface PropertyListing {
    id: string;
    address: Address;
    price: number;
    details: {
      type: string;
      bedrooms: number;
      bathrooms: Bathrooms;
      squareFeet: number;
      yearBuilt: number;
      levels: string;
      furnished: boolean;
    };
    hoa: HOA;
    features: Features;
    appliances: string[];
    utilities: Utilities;
    additionalInfo: AdditionalInfo;
    description: string;
    listingInfo: ListingInfo;
    contactInfo: ContactInfo;
  }
  