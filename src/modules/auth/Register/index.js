import { recaptchaService } from "@/service/recaptcha.service";

export async function registerAction(request) {
  const formData = await request.formData();
  if (!formData) {
    throw new Error("formData is undefined");
  }

  const name = formData.get("name");
  const born_day = formData.get("born_day");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");
  const email = formData.get("email");

  console.log(name, born_day, password, password_confirmation, email);

  if (password !== password_confirmation) {
    return { success: false, message: "Passwords do not match" };
  }

  const recaptchaData = await recaptchaService();
  if (!recaptchaData.success) {
    return { success: false, message: "reCAPTCHA verification failed" };
  }

  const newUser = {
    name,
    born_day,
    email,
    password,
  };

  // todo: agregar el servicio para crear el registro en el backend

  return { success: true, user: newUser };
}
