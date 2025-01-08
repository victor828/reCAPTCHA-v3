import { load } from "recaptcha-v3";
import { useEffect, useState, memo } from "react";
import { recaptchaSiteKey } from "../variables";
import { recaptchaService } from "../service/recaptcha.service";

interface RecaptchaProps {
  path: string;
  dependencys?: React.DependencyList;
  expiration?: number;
  onActivateSecurity?: () => void;
}

interface RecaptchaResponse {
  success: boolean;
  message?: string;
  activateSecurity?: boolean;
  strongerRecaptcha?: boolean;
}

const Recaptcha = ({
  path,
  dependencys = [],
  expiration = 2,
  onActivateSecurity,
}: RecaptchaProps) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [tokenExpiration, setTokenExpiration] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const fetchToken = async () => {
      const recaptcha = await load(recaptchaSiteKey);
      const token = await recaptcha.execute(path);
      setRecaptchaToken(token);
      sessionStorage.setItem("recapchaToken", token);

      if (tokenExpiration) {
        clearTimeout(tokenExpiration);
      }
      const expirationTimeout = setTimeout(() => {
        setRecaptchaToken("");
      }, expiration * 60 * 1000); // Token expira en 2 minutos por default
      setTokenExpiration(expirationTimeout);

      const response: RecaptchaResponse = await recaptchaService();
      if (response.activateSecurity && onActivateSecurity) {
        onActivateSecurity();
      }
      if (response.strongerRecaptcha) {
        // Manejar el cambio a un tipo de reCAPTCHA más fuerte
        const strongerRecaptcha = await load(recaptchaSiteKey);
        const strongerToken = await strongerRecaptcha.execute("stronger_path");
        setRecaptchaToken(strongerToken);
        sessionStorage.setItem("recapchaToken", strongerToken);
      }
    };

    fetchToken();

    return () => {
      if (tokenExpiration) {
        clearTimeout(tokenExpiration);
      }
    };
  }, [path, ...dependencys]);

  return (
    <input
      className="visible"
      type="hidden"
      name="recaptchaToken"
      value={recaptchaToken}
    />
  );
};

export default memo(Recaptcha);
