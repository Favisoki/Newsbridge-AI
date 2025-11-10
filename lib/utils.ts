import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ObjectLiteral {
  [key: string]: any;
}

// Signup Data Management
export const saveSignupData = (data: Partial<ObjectLiteral>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('signup_data', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save signup data:', error);
  }
};

export const getSignupData = (): ObjectLiteral | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem('signup_data');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get signup data:', error);
    return null;
  }
};

export const clearSignupData = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('signup_data');
  } catch (error) {
    console.error('Failed to clear signup data:', error);
  }
};

// User Data Management
// export const saveUserData = (data: Partial<ObjectLiteral>): void => {
//   if (typeof window === 'undefined') return;
  
//   try {
//     const existing = localStorage.getItem('user_data');
//     const current = existing ? JSON.parse(existing) : {};
//     localStorage.setItem('user_data', JSON.stringify({ ...current, ...data }));
//   } catch (error) {
//     console.error('Failed to save user data:', error);
//   }
// };

// export const getUserData = (): ObjectLiteral | null => {
//   if (typeof window === 'undefined') return null;
  
//   try {
//     const data = localStorage.getItem('user_data');
//     return data ? JSON.parse(data) : null;
//   } catch (error) {
//     console.error('Failed to get user data:', error);
//     return null;
//   }
// };

// export const clearUserData = (): void => {
//   if (typeof window === 'undefined') return;
  
//   try {
//     localStorage.removeItem('user_data');
//   } catch (error) {
//     console.error('Failed to clear user data:', error);
//   }
// };

// // Access Token Management
// export const saveAccessToken = (token: string): void => {
//   if (typeof window === 'undefined') return;
  
//   try {
//     localStorage.setItem('accessToken', token);
//   } catch (error) {
//     console.error('Failed to save access token:', error);
//   }
// };

// export const getAccessToken = (): string | null => {
//   if (typeof window === 'undefined') return null;
  
//   try {
//     return localStorage.getItem('accessToken');
//   } catch (error) {
//     console.error('Failed to get access token:', error);
//     return null;
//   }
// };

// export const clearAccessToken = (): void => {
//   if (typeof window === 'undefined') return;
  
//   try {
//     localStorage.removeItem('accessToken');
//   } catch (error) {
//     console.error('Failed to clear access token:', error);
//   }
// };

// Check if user is authenticated
// export const isAuthenticated = (): boolean => {
//   const token = getAccessToken();
//   return !!token;
// };

// Clear all session data
// export const clearAllData = (): void => {
//   clearSignupData();
//   clearUserData();
//   clearAccessToken();
// };