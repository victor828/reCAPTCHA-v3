import { Request, Response } from "express";

const verifyReCaptcha = async (token: string) => {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      errorType: "VerificationError",
      status: 500,
      message: "Failed to verify reCAPTCHA",
    };
  }
};

class RecaptchaController {
  async verifyToken(req: Request, res: Response) {
    const { token } = req.body;

    if (typeof token !== "string") {
      return res.status(400).send({
        success: false,
        errorType: "ValidationError",
        status: 400,
        message: "Invalid request body, token field must be a valid string",
      });
    }

    const response = await verifyReCaptcha(token);
    if ("errorType" in response) {
      return res.status(response.status).send({
        success: false,
        ...response,
      });
    }
    return res.status(200).send({
      success: true,
      ...response,
    });
  }
}

export const recaptchaController = new RecaptchaController();
