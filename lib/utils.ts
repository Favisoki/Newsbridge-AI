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

export const storage = {
  set: (key: string, value: any, expiryMs?: number) => {
    try {
      const item = expiryMs
        ? { value, expiry: Date.now() + expiryMs }
        : { value };
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded');

      }
      console.error('localStorage.setItem failed:', e);
      return false;
    }
  },

  get: (key: string) => {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      
      // Check expiry
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (e) {
      console.error('localStorage.getItem failed:', e);
      localStorage.removeItem(key); // Clean up corrupted data
      return null;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('localStorage.removeItem failed:', e);
    }
  },
};

export const getNameAbbr = (name: string): string => {
  if (!name || !name.trim()) return "";
  
  return name
    .trim()
    .split(/\s+/) // Split by one or more whitespace characters
    .filter(word => word.length > 0) // Remove empty strings
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
