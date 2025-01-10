import { urlBase } from "../variables";

export const recaptchaService = async (params = {}) => {
  const { timeout = 120000 } = params;
  const token = sessionStorage.getItem("recapchaToken");

  if (!token) return { success: false };

  try {
    const recaptchaResponse = await fetch(urlBase + "api/recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      timeout: timeout,
    });

    const data = await recaptchaResponse.json();

    if (!data.success) {
      return { success: false };
    }

    const { score, strongerRecaptcha } = data;

    if (strongerRecaptcha) {
      // Cambiar a un tipo de reCAPTCHA más fuerte
      return { success: true, strongerRecaptcha: true };
    }

    if (score >= 0.7) {
      // Puntuación suficiente para pasar la verificación
      return { success: true };
    } else {
      // Manejar puntuaciones bajas (posibles bots)
      alert("Verificación adicional requerida ya que usted es un Boot");
      return {
        success: false,
        message: "Verificación adicional requerida",
        activateSecurity: true,
      };
    }
  } catch (error) {
    console.error("Error en la verificación de reCAPTCHA:", error);
    return { success: false, message: "Error en la verificación de reCAPTCHA" };
  }
};
