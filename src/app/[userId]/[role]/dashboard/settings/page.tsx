// src/app/[userId]/[role]/dashboard/settings/page.tsx

"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Gutter from "@/app/components/Gutter";
import GenerateUsername from "@/components/user/GenerateUsername";
import HDivide from "@/app/components/HDivide";
import SpecificSetting from "@/app/components/SpecificSetting";

const SettingsPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.name;

  return (
    <Gutter>
      <div>
        <h1 className="text-5xl">Settings</h1>
        <div>
          {userId && userName ? (
            <GenerateUsername userId={userId} />
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        <HDivide />
        <SpecificSetting
        title="Name"
        field="name"
        value="Joseph Sardella" // Fetch the initial value dynamically
        userId={userId}
        buttonLabel="Save Changes"
      />
      <HDivide />
      <SpecificSetting
        title="Email"
        field="email"
        value="Josephsardella@gmail.com" // Fetch the initial value dynamically
        userId={userId}
        buttonLabel="Save Changes"
      />
      <HDivide />
      <SpecificSetting
        title="Phone"
        field="phone"
        value="" // Fetch the initial value dynamically
        userId={userId}
        buttonLabel="Save Changes"
      />
      <HDivide />
      <SpecificSetting
        title="Address"
        field="address"
        value="" // Fetch the initial value dynamically
        userId={userId}
        buttonLabel="Save Changes"
      />
      </div>
    </Gutter>
  );
};

export default SettingsPage;
