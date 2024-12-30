import { load } from "recaptcha-v3";
import { useEffect, useState } from "react";
import { recaptchaSiteKey } from "../variables";

interface RecaptchaProps {
  path: string;
  dependencys?: string[];
}

const Recaptcha = (props: RecaptchaProps) => {
  const [recaptchaToken, setRecaptchaToken] = useState("");

  sessionStorage.setItem("recapchaToken", recaptchaToken);

  useEffect(() => {
    load(recaptchaSiteKey).then((recaptcha) => {
      recaptcha.execute(props.path).then((token) => {
        setRecaptchaToken(token);
      });
    });
  }, [props.dependencys]);

  return <input type='hidden' name='recaptchaToken' value={recaptchaToken} />;
};

export default Recaptcha;
