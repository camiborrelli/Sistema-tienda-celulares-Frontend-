import Joi from "joi";

export const registerUsuarioSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>_]{6,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base": "Password must contain at least one uppercase letter and one number",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password",
    "string.empty": "Confirm Password is required",
  }),
});
