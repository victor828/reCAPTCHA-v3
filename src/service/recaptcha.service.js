import { urlBase } from "../variables";

export const recaptchaService = async (params = {}, registerUser) => {
  const { timeout = 120000 } = params;
  const values = sessionStorage.getItem("recapchaToken");

  if (!values) return { success: false };
  const recaptchaResponse = await fetch(urlBase + "api/recaptcha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: values }),
    timeout: timeout,
  });

  const data = await recaptchaResponse.json();

  if (data.success && registerUser) {
    const newUser = {
      /* datos del nuevo usuario */
    };
    registerUser(newUser); // Registrar el nuevo usuario
  }

  return data;
};
