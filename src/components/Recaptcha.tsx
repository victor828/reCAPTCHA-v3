import { load } from "recaptcha-v3";
import { useEffect, useState, memo } from "react";
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
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState<NodeJS.Timeout | null>(
    null
  );

  sessionStorage.setItem("recapchaToken", recaptchaToken);

  useEffect(() => {
    const fetchToken = () => {
      load(recaptchaSiteKey).then((recaptcha) => {
        recaptcha.execute(path).then((token) => {
          setRecaptchaToken(token);
          if (tokenExpiration) {
            clearTimeout(tokenExpiration);
          }
          const expirationTimeout = setTimeout(() => {
            setRecaptchaToken("");
          }, expiration * 60 * 1000); // Token expira en 2 minutos por default
          setTokenExpiration(expirationTimeout);
        });
      });
    };

    fetchToken();

    return () => {
      if (tokenExpiration) {
        clearTimeout(tokenExpiration);
      }
    };
  }, [path, ...dependencys]);

  return <input type="hidden" name="recaptchaToken" value={recaptchaToken} />;
};

export default memo(Recaptcha);
