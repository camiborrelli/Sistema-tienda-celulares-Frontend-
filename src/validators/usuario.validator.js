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

export const loginUsuarioSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "El nombre de usuario debe ser texto",
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
    "string.max": "El nombre de usuario no debe exceder los 30 caracteres",
    "any.required": "El nombre de usuario es requerido",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "La contraseña debe ser texto",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "any.required": "La contraseña es requerida",
  }),
});

export const modificarUsuarioSchema = Joi.object({
  username: Joi.string().min(3).max(30).messages({
    "string.base": "El nombre de usuario debe ser texto",
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
    "string.max": "El nombre de usuario no debe exceder los 30 caracteres",
    "any.required": "El nombre de usuario es requerido",
    "string.empty": "El nombre de usuario no puede estar vacío",
  }),
  email: Joi.string().email().messages({
    "string.base": "El email debe ser texto",
    "string.email": "El email debe tener un formato válido",
    "string.empty": "El email no puede estar vacío",
  }),
  plan: Joi.string().valid("Plus", "Premium").messages({
    "any.only": "El plan debe ser uno de los siguientes: Plus, Premium",
  }),
  password: Joi.string().min(6).messages({
    "string.base": "La contraseña debe ser texto",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
});
