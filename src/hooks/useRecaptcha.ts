import { useEffect, useState, useCallback } from "react";
import { load } from "recaptcha-v3";
import { recaptchaSiteKey } from "../variables";


type Badge = "bottomright" | "bottomleft" | "inline";

const useRecaptcha = (
    path: string, 
    dependencys: React.DependencyList = [], 
    expirationTime: number = 2,
    hiden?: boolean, 
    badge: Badge = "bottomright") => {

  const [tokenExpiration, setTokenExpiration] = useState<NodeJS.Timeout | null>(null);

  const fetchToken = useCallback(async () => {
    const recaptcha = await load(recaptchaSiteKey, { 
        useRecaptchaNet: true, 
        autoHideBadge:hiden, 
        renderParameters: { size: "invisible", badge: badge } });
        
    const token = await recaptcha.execute(path);
    sessionStorage.setItem("recapchaToken", token);

    if (tokenExpiration) {
      clearTimeout(tokenExpiration);
    }
    const expiration = setTimeout(() => {
      sessionStorage.removeItem("recapchaToken");
    }, (expirationTime * 60) * 1000); 
    setTokenExpiration(expiration);

  }, [path, tokenExpiration]);

  useEffect(() => {
    fetchToken();

    return () => {
      if (tokenExpiration) {
        clearTimeout(tokenExpiration);
      }
      sessionStorage.removeItem("recapchaToken");
    };
  }, [path, ...dependencys]);

  return null;
};

export default useRecaptcha;
