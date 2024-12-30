import { recaptchaService } from "../../../service/recaptcha.service";

class LoginFunctions {
  async loginAction() {
    const recaptchaData = await recaptchaService();
    if (!recaptchaData.success) {
      return { success: false };
    }
    return { success: true };
  }
}

export const loginFuncs = new LoginFunctions();

export const loginAction = async () => {
  const result = await loginFuncs.loginAction();
  if (!result.success) {
    return { error: "Recaptcha validation failed, reload the page please" };
  }
  return { success: true };
};
