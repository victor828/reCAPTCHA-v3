import { Navigate } from "react-router-dom";
import { recaptchaService } from "@/service/recaptcha.service";

class RegisterFunctions {
  async registerAction({ formData }) {
    if (!formData) {
      throw new Error("formData is undefined");
    }

    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const password = formData.get("password");
    const email = formData.get("email");

    console.log(first_name, last_name, password, email);

    const recaptchaData = await recaptchaService();
    if (!recaptchaData.success) {
      return { success: false };
    }

    const newUser = {
      first_name,
      last_name,
      email,
      password,
    };

    return { success: true, user: newUser };
  }
}

export const registerFuncs = new RegisterFunctions();
