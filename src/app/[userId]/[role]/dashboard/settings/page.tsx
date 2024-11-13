"use client";

import React from 'react';
import UsernameSelector from '@/components/user/GenerateUsername';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h2>Change Username</h2>
        {userEmail ? (
          <UsernameSelector email={userEmail} />
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
