import { recaptchaService } from "../../../service/recaptcha.service";

export async function loginAction() {
  const recaptchaData = await recaptchaService();
  if (!recaptchaData.success) {
    return { success: false };
  }
  return { success: true };
}
