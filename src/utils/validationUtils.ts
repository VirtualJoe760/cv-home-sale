// src/utils/validationUtils.ts

/**
 * Validate phone number in the format (555) 555-5555
 */
export const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };
  
  /**
   * Validate email format
   */
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate address format (e.g., 555 Main St Palm Desert, CA 92260)
   */
  export const validateAddress = (address: string): boolean => {
    const addressRegex = /^\d+\s[A-Za-z\s]+\s[A-Za-z\s]+,\s[A-Za-z]{2}\s\d{5}$/;
    return addressRegex.test(address);
  };
  