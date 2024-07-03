import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIfMobile = () => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/iPhone|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i)) || window.innerWidth <= 768;
    setIsMobile(mobile);
  };

  useEffect(() => {
    checkIfMobile(); // Initial check on mount
    window.addEventListener('resize', checkIfMobile); // Update on resize

    return () => window.removeEventListener('resize', checkIfMobile); // Cleanup on unmount
  }, []);

  return isMobile;
};
