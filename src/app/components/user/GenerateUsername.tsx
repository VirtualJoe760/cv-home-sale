"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GenerateUsername = ({ userId }: { userId: string }) => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usernameConfirmed, setUsernameConfirmed] = useState(false);

  useEffect(() => {
    const fetchExistingUsername = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/username`);
        if (!response.ok) throw new Error("Failed to fetch username");

        const data = await response.json();
        if (data.username) {
          setSelectedUsername(data.username);
          setUsernameConfirmed(true);
        } else {
          setSelectedUsername("Username not set");
          setUsernameConfirmed(false);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setError("Could not retrieve username");
      }
    };

    fetchExistingUsername();
  }, [userId]);

  const fetchUsernames = async () => {
    setError(null);
    setUsernameConfirmed(false);

    try {
      const response = await fetch(`/api/user/${userId}/username`);
      if (!response.ok) throw new Error("Failed to generate usernames");

      const data = await response.json();
      if (Array.isArray(data.usernames)) {
        setUsernames(data.usernames);
      } else {
        setError("Invalid usernames data");
      }
    } catch (err) {
      console.log(err);
      setError("Could not retrieve usernames");
    }
  };

  const confirmUsername = async () => {
    if (!selectedUsername || selectedUsername === "Username not set") return;

    setError(null);

    try {
      const response = await fetch(`/api/user/${userId}/username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: selectedUsername }),
      });
      if (!response.ok) throw new Error("Failed to confirm username");

      setUsernameConfirmed(true);
      setUsernames([]); // Clear usernames array after confirmation
      toast.success(`Update Successful! Your username is ${selectedUsername}`);
    } catch (err) {
      console.log(err);
      setError("Could not confirm username");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Username Display and Buttons */}
      <div className="flex items-center justify-between w-full mt-4 md:mt-0">
  <h2 className="text-3xl font-semibold">
    Username: {selectedUsername ? selectedUsername : "Not Set"}
  </h2>

  <div className="flex space-x-4 mt-4">
    <button onClick={fetchUsernames} className="button">
      Generate
    </button>
    {!usernameConfirmed && selectedUsername && (
      <button
        onClick={confirmUsername}
        className="button"
      >
        Confirm
      </button>
    )}
  </div>
</div>

      {/* Error Message */}
      {error && <p className="text-red-500 font-bold">{error}</p>}

      {/* Username Suggestions */}
      {usernames.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {usernames.map((username, index) => (
            <React.Fragment key={index}>
              <p
                className={`cursor-pointer text-lg px-2 ${
                  username === selectedUsername
                    ? "font-bold text-blue-500"
                    : "text-blue-600 hover:text-yellow-400"
                }`}
                onClick={() => setSelectedUsername(username)}
              >
                {username}
              </p>
              {index < usernames.length - 1 && (
                <span className="text-gray-400 text-xl font-extrabold leading-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateUsername;
