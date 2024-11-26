"use client";

import React, { useState, useEffect } from 'react';

interface SettingsFormProps {
  userId: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone || ''); // Assuming phone might not exist yet
          setAddress(data.address || ''); // Assuming address might not exist yet
          setSubscribeNewsletter(data.subscribeNewsletter || false); // Assuming a field for subscription
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          subscribeNewsletter,
        }),
      });
      if (response.ok) {
        setMessage("Your information was updated successfully.");
      } else {
        setMessage("Failed to update information.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("Error occurred while updating information.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={subscribeNewsletter}
          onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
          className="checkbox"
        />
        <label className="ml-2">Subscribe to Newsletter</label>
      </div>

      <button type="submit" className="button">
        Save Changes
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default SettingsForm;
