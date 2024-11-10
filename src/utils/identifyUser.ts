import { getNavigationForRoles } from "@/utils/userNav";
import { UserRole } from "@/types/user";

async function fetchUserRole(userId: string): Promise<UserRole> {
  try {
    // Ensure API Base URL is defined
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error("API base URL is not defined in the environment variables.");
    }

    const apiUrl = new URL(`/api/user/${userId}`, process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log("API URL:", apiUrl.toString());

    const response = await fetch(apiUrl.toString());

    if (response.status === 404) {
      console.warn(`User with ID ${userId} not found, defaulting to guest role.`);
      return "guest"; 
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch role for user ${userId}: ${response.statusText}`);
    }

    const userData = await response.json();
    console.log("Fetched user data:", userData);

    if (!userData.role) {
      console.warn(`Role not found in user data for user ${userId}, defaulting to guest.`);
      return "guest";
    }

    return userData.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return "guest"; // Return "guest" as a fallback in case of errors
  }
}

export async function identifyUser(userId: string) {
  try {
    const userRole = await fetchUserRole(userId);
    console.log("identifyUser - Resolved User Role:", userRole); // Debug log

    const navigationItems = getNavigationForRoles(userId, [userRole]);
    console.log("identifyUser - Final Navigation Items for Role", userRole, ":", navigationItems); // Debug log

    return { userRole, navigationItems };
  } catch (error) {
    console.error("Error in identifyUser function, defaulting to guest role:", error);
    return { userRole: "guest" as UserRole, navigationItems: getNavigationForRoles(userId, ["guest"]) };
  }
}
