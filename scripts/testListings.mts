import fetch from 'node-fetch';

const accessKey = 'hwZHXiSwou47_D5t6sHJdp'; // Static access key

// Function to fetch price summary data
async function fetchPriceSummary(idxID: string) {
  const url = `https://api.idxbroker.com/mls/prices/${idxID}?rf[]=*`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accesskey': accessKey,
    'outputtype': 'json'
  };

  try {
    const response = await fetch(url, { method: 'GET', headers });

    // Log the status code to check if we received a successful response
    console.log('Response Status:', response.status);

    const rawData = await response.text();
    console.log('Raw Response:', rawData); // Log raw data for inspection

    if (rawData) {
      // Parse JSON only if rawData is not empty
      const data = JSON.parse(rawData);
      console.log('MLS Price Summary:', data);
    } else {
      console.log('No data received from API.');
    }

  } catch (error) {
    console.error('Error fetching price summary:', error);
  }
}

// Replace 'c041' with the actual IDX ID for testing
fetchPriceSummary('c041');
