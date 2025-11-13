import Joi from "joi";

export const agregarAccesorioSchema = Joi.object({
  nombre: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .min(4)
    .max(30)
    .required()
    .messages({
      "string.base": "El nombre debe ser texto",
      "string.pattern.base": "El nombre debe contener solo letras y espacios",
      "string.min": "El nombre debe tener al menos 4 caracteres",
      "string.max": "El nombre no debe exceder los 30 caracteres",
      "string.empty": "El nombre no puede estar vacío",
      "any.required": "El nombre no puede estar vacío",
    }),
  descripcion: Joi.string().min(10).max(200).required().messages({
    "string.base": "La descripción debe ser texto",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción no debe exceder los 200 caracteres",
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción es requerida",
  }),
  precio: Joi.number().empty("").positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser positivo",
    "any.required": "El precio no puede estar vacio",
  }),
  stock: Joi.number().empty("").integer().min(0).required().messages({
    "number.base": "El stock debe ser un número",
    "number.integer": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
    "any.required": "El stock es requerido",
  }),
  modeloCompatible: Joi.string().empty("").min(2).max(30).required().messages({
    "string.base": "El modelo compatible debe ser texto",
    "string.min": "El modelo compatible debe tener al menos 2 caracteres",
    "string.max": "El modelo compatible no debe exceder los 30 caracteres",
    "any.required": "El modelo compatible es requerido",
  }),
  categoria: Joi.string().empty("").required().messages({
    "any.required": "La categoría es requerida",
  }),
});
