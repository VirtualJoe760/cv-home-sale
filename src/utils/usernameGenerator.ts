// src/utils/usernameGenerator.ts

const adjectives = [
  "Bold", "Swift", "Mellow", "Bright", "Brave", "Calm", "Clever", "Eager", "Gentle", "Witty",
  "Quick", "Sharp", "Lively", "Vibrant", "Quiet", "Wise", "Happy", "Serene", "Mighty", "Steady",
  "Energetic", "Graceful", "Fierce", "Radiant", "Luminous", "Soft", "Fearless", "Daring", "Loyal", "Sly",
  "Humble", "Determined", "Charming", "Brilliant", "Creative", "Courageous", "Mysterious", "Adventurous", "Playful", "Energetic",
  "Unique", "Friendly", "Bold", "Noble", "Confident", "Serious", "Optimistic", "Quiet", "Imaginative", "Loyal",
  "Generous", "Efficient", "Curious", "Innovative", "Harmonious", "Tough", "Dynamic", "Balanced", "Zesty", "Altruistic",
  "Funky", "Spontaneous", "Hasty", "Loyal", "Gentle", "Versatile", "Spirited", "Energetic", "Chilled", "Caring",
  "Mature", "Free", "Playful", "Vivid", "Charming", "Trustworthy", "Resilient", "Enthusiastic", "Fiery", "Loyal",
  "Whimsical", "Brilliant", "Sturdy", "Reliable", "Grateful", "Spicy", "Diligent", "Vigorous", "Resourceful", "Friendly",
  "Noble", "Creative", "Sharp", "Speedy", "Tough", "Proud", "Mindful", "Inventive", "Loving", "Practical",
  "Intelligent", "Brave", "Dynamic", "Clever", "Harmonious", "Radiant", "Diligent", "Confident", "Mighty", "Enduring",
  "Fierce", "Shiny", "Playful", "Precise", "Steadfast", "Unique", "Stylish", "Spontaneous", "Courageous", "Vivid",
  "Resilient", "Refined", "Generous", "Artistic", "Radiant", "Zealous", "Genuine", "Adventurous", "Imaginative", "Grounded",
  "Tough", "Delicate", "Playful", "Dynamic", "Reliable", "Charismatic", "Confident", "Authentic", "Determined", "Grateful"
];

const nouns = [
  "Falcon", "Lion", "Phoenix", "Fox", "Hawk", "Tiger", "Bear", "Wolf", "Eagle", "Owl",
  "Dragon", "Panther", "Jaguar", "Leopard", "Cheetah", "Shark", "Raven", "Crow", "Hummingbird", "Penguin",
  "Whale", "Dolphin", "Bear", "Coyote", "Raccoon", "Zebra", "Giraffe", "Elephant", "Koala", "Bison",
  "Gorilla", "Hawk", "Falcon", "Whale", "Turtle", "Mongoose", "Cheetah", "Hummingbird", "Stallion", "Cobra",
  "Eagle", "Bison", "Wolf", "Leopard", "Raven", "Lynx", "Puma", "Giraffe", "Wombat", "Lynx",
  "Peacock", "Vulture", "Rabbit", "Cheetah", "Deer", "Hummingbird", "Wolf", "Stallion", "Cougar", "Bison",
  "Elephant", "Tiger", "Otter", "Snake", "Zebra", "Lion", "Kangaroo", "Koala", "Alligator", "Panda",
  "Crocodile", "Goose", "Raven", "Bear", "Shark", "Falcon", "Owl", "Lynx", "Leopard", "Panther",
  "Bat", "Elephant", "Lioness", "Rhino", "Penguin", "Raccoon", "Whale", "Tiger", "Turtle", "Jaguar",
  "Coyote", "Fox", "Mule", "Shark", "Porcupine", "Bat", "Monkey", "Sloth", "Zebra", "Gorilla",
  "Duck", "Wolverine", "Armadillo", "Giraffe", "Bison", "Otter", "Crocodile", "Peacock", "Rabbit",
  "Lion", "Vulture", "Hawk", "Zebra", "Tiger", "Dove", "Eagle", "Leopard", "Cheetah", "Parrot",
  "Lamb", "Antelope", "Raven", "Bear", "Tiger", "Rabbit", "Panther", "Buffalo", "Swan", "Koala",
  "Panda", "Crow", "Swan", "Hornet", "Giraffe", "Sloth", "Elephant", "Penguin", "Whale", "Eagle",
  "Vulture", "Dragon", "Falcon", "Dove", "Raccoon", "Parrot", "Bat", "Cheetah", "Lynx", "Lion"
];


/**
 * Function to generate unique usernames.
 * @param count - Number of usernames to generate. Default is 5.
 * @returns An array of generated usernames.
 */
export default function generateUsernames(count = 5): string[] {
  const usernames = new Set<string>();

  while (usernames.size < count) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 100);
    const username = `${adjective}${noun}${number}`;
    usernames.add(username);
  }

  return Array.from(usernames);
}
