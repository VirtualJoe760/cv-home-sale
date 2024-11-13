// src/app/components/user/GenerateUsername.tsx

import React, { useEffect, useState } from 'react';

const GenerateUsername = ({ email }: { email: string }) => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [hasUsername, setHasUsername] = useState<boolean>(false);

  async function fetchUsernames(email: string) {
    if (!email) {
      console.error("No email provided for fetchUsernames");
      return;
    }

    try {
      const response = await fetch(`/api/user/generateUsername?email=${email}`);
      
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error fetching usernames:", errorMessage);
        throw new Error("Failed to fetch usernames");
      }

      const data = await response.json();
      setHasUsername(data.hasUsername);
      setUsernames(data.usernames || []);
    } catch (error) {
      console.error("Error in fetchUsernames:", error);
    }
  }

  // Function to generate and save a new username
  async function handleGenerateUsername() {
    const newUsername = generateRandomUsername();

    try {
      const response = await fetch('/api/user/saveUsername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username: newUsername }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error generating username:", errorMessage);
        throw new Error("Failed to generate username");
      }

      const data = await response.json();
      setHasUsername(true);
      setUsernames([data.username]);
    } catch (error) {
      console.error("Error in handleGenerateUsername:", error);
    }
  }

  // Example function to generate a random username
  function generateRandomUsername() {
    return `user${Math.floor(Math.random() * 10000)}`;
  }

  useEffect(() => {
    fetchUsernames(email);
  }, [email]);

  return (
    <div>
      <h2>Suggested Usernames</h2>
      {hasUsername ? (
        <ul>
          {usernames.map((username, index) => (
            <li key={index}>{username}</li>
          ))}
        </ul>
      ) : (
        <button onClick={handleGenerateUsername}>Generate Username</button>
      )}
    </div>
  );
};

export default GenerateUsername;
