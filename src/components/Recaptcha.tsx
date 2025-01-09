import { load } from "recaptcha-v3";
import { useEffect, useState, memo, useCallback } from "react";
import { recaptchaSiteKey } from "../variables";

interface RecaptchaProps {
  path: string;
  dependencys?: React.DependencyList;
  expiration?: number;
}

const Recaptcha = ({
  path,
  dependencys = [],
  expiration = 2,
}: RecaptchaProps) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [tokenExpiration, setTokenExpiration] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchToken = useCallback(async () => {
    const recaptcha = await load(recaptchaSiteKey, { useRecaptchaNet: true });
    const token = await recaptcha.execute(path);
    setRecaptchaToken(token);
    sessionStorage.setItem("recapchaToken", token);

    if (tokenExpiration) {
      clearTimeout(tokenExpiration);
    }
    const expirationTimeout = setTimeout(() => {
      setRecaptchaToken("");
    }, expiration * 60 * 1000);
    setTokenExpiration(expirationTimeout);
  }, [path, expiration, tokenExpiration]);

  useEffect(() => {
    fetchToken();

    return () => {
      if (tokenExpiration) {
        clearTimeout(tokenExpiration);
      }
      sessionStorage.removeItem("recapchaToken");
    };
  }, [path, ...dependencys]);

  return <input type="hidden" name="recaptchaToken" value={recaptchaToken} />;
};

export default memo(Recaptcha);
