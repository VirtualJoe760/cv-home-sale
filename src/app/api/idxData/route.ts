import { NextResponse } from 'next/server';

export async function GET() {
  const url = "https://api.idxbroker.com/clients/listings/active";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "accesskey": process.env.IDX_BROKER_API_KEY as string,
    "ancillarykey": process.env.IDX_BROKER_API_KEY as string,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    // Log response status and text for full details
    console.log("Status:", response.status);
    const responseText = await response.text();
    console.log("Response text:", responseText);

    // Check if response is JSON format
    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = JSON.parse(responseText);
      return NextResponse.json(data);
    } else {
      console.error("Non-JSON response received:", responseText);
      return NextResponse.json({ error: "Unexpected response format" }, { status: response.status });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch data from IDX Broker" }, { status: 500 });
  }
}
