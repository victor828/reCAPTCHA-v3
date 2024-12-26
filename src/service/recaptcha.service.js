import apiFetch from "./api-fetch";

export const recaptchaService = async ({ timeout = 120000 }) => {
  const values = sessionStorage.getItem("recapchaToken");

  if (!values) return { success: false };
  const recaptchaResponse = await fetch("recaptcha/validate", {
    method: "POST",
    body: { token: values },
    timeout: timeout,
  });

  return recaptchaResponse.data;
};
