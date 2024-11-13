// src/utils/usernameGenerator.ts

// Arrays of adjectives and nouns to generate usernames
const adjectives = ["Bold", "Swift", "Mellow", "Bright", "Brave", "Calm", "Clever", "Eager", "Gentle", "Witty"];
const nouns = ["Falcon", "Lion", "Phoenix", "Fox", "Hawk", "Tiger", "Bear", "Wolf", "Eagle", "Owl"];

/**
 * Function to generate unique usernames.
 * @param count - Number of usernames to generate. Default is 5.
 * @returns An array of generated usernames.
 */
export function generateUsernames(count = 5): string[] {
  const usernames = new Set<string>();

  while (usernames.size < count) {
    // Randomly pick an adjective, noun, and a number to create a unique username
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 100);

    // Create the username and add it to the set to ensure uniqueness
    const username = `${adjective}${noun}${number}`;
    usernames.add(username);
  }

  return Array.from(usernames);
}
