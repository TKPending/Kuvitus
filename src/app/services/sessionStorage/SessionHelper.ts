export const getSessionStorage = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
    return null;
  };
  
  export const setSessionStorage = (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value);
    }
  };
  
  export const removeSessionStorage = (key: string): void => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  };
  