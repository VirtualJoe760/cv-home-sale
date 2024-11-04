"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import { LogoContext } from "@/app/layout";
import GoogleIcon from "@/assets/socials/google.svg";
import FacebookIcon from "@/assets/socials/facebook.svg";

const SignIn = () => {
  const logo = useContext(LogoContext); // Access theme-based logo from context
  const router = useRouter(); // For navigating after successful login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before sign in

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    // Check for error and handle it
    if (result?.error) {
      setError(result.error); // Set error message if sign in fails
    } else {
      // Navigate to the desired page upon successful sign in
      router.push("/"); // Redirect to home or desired page
    }
  };

  const handleGoogleSignIn = async () => {
    // Call signIn for Google authentication
    await signIn("google", { redirect: true });
  };

  return (
    <div
      className="flex lg:min-h-full xl:min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/city-images/indian-wells.jpg")`,
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-900 bg-opacity-80 p-8 rounded-md shadow-md">
        <Image
          src={logo}
          alt="Coachella Valley Home Sale Logo"
          className="mx-auto h-10 w-auto"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

        <div className="mt-10">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email} // Controlled input
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="button flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Divider for social sign-in */}
          <div className="relative mt-8">
            <hr className="border-t border-gray-700" />
            <span className="absolute inset-x-0 -top-2.5 mx-auto w-max px-4 bg-gray-900 text-sm font-medium text-gray-400">
              Or continue with
            </span>
          </div>

          {/* Social login buttons */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus-visible:ring-transparent dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-500"
            >
              <GoogleIcon className="w-5 h-5" aria-hidden="true" />
              <span>Google</span>
            </button>

            <button
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus-visible:ring-transparent dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-500"
            >
              <FacebookIcon className="w-5 h-5" aria-hidden="true" />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a member?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign Up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
