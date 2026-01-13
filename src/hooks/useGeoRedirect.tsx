
import { useEffect, useState } from 'react';
import { detectUserCountryAndRedirect, detectCountryByTimezone } from '@/utils/geoRedirect';

export const useGeoRedirect = () => {
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const handleGeoRedirection = async () => {
      // Prevent multiple checks
      if (hasChecked) return;
      
      setHasChecked(true);
      
      try {
        // First try IP-based detection
        const ipRedirectTriggered = await detectUserCountryAndRedirect();
        
        // If IP detection failed or didn't trigger redirect, try timezone fallback
        if (!ipRedirectTriggered) {
          const timezoneRedirectTriggered = detectCountryByTimezone();
          
          if (!timezoneRedirectTriggered) {
            // User not detected as being from India
          }
        }
      } catch {
        // Ignore geo-redirection errors
      }
    };

    // Run the check immediately
    handleGeoRedirection();
  }, [hasChecked]);

  return {};
};
