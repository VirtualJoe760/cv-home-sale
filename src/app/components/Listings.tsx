"use client";

import { useEffect, useState } from "react";

// Define a Listing type to specify expected properties
interface Listing {
  propertyTitle: string;
  propertyDescription: string;
  // Add any other properties as needed based on IDX Broker API data
}

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null); // Allow error to be either string or null

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/idxData");
        if (!res.ok) throw new Error("Network response was not ok");
        const data: Listing[] = await res.json(); // Specify data type as Listing array
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <h1>Active Listings</h1>
      {error && <p>Error: {error}</p>}
      {listings.length > 0 ? (
        listings.map((listing, index) => (
          <div key={index}>
            <h2>{listing.propertyTitle || "Listing Title"}</h2>
            <p>{listing.propertyDescription || "Description not available"}</p>
          </div>
        ))
      ) : (
        <p>Loading listings...</p>
      )}
    </div>
  );
};

export default Listings;
