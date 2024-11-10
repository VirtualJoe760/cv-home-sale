// app/listings/page.tsx

async function fetchListingCount(city: string, state: string) {
  try {
    const response = await fetch(`https://api.idxbroker.com/clients/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': process.env.IDX_BROKER_API_KEY || '', // Store in .env
        'outputtype': 'json'
      },
      body: new URLSearchParams({
        city,
        state,
        count: 'true' // Modify based on IDX Broker documentation
      }).toString(),
      // Necessary for server-side data fetching in Next.js
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch listings, status: ${response.status}`);
    }

    const data = await response.json();
    return data.count; // Assuming "count" is the key in the response data
  } catch (error) {
    console.error('IDX Broker API error:', error);
    return null;
  }
}

export default async function ListingsPage() {
  const listingCount = await fetchListingCount('Palm Desert', 'CA');

  return (
    <div>
      {listingCount !== null ? (
        <p>Number of listings in Palm Desert, CA: {listingCount}</p>
      ) : (
        <p>Loading listing count...</p>
      )}
    </div>
  );
}
