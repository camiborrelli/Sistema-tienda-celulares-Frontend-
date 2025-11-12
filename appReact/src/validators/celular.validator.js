import Joi from "joi";

export const altaCelularSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  marca: Joi.string().min(2).max(100).required(),
  modelo: Joi.number().min(1).required(),
  stock: Joi.number().min(0).required(),
  precio: Joi.number().min(0).required(),
  accesoriosCompatibles: Joi.number().min(0).required(),
  fechaCreacion: Joi.date(),
  imagen: Joi.any()
    .required()
    .custom((value, helpers) => {
      if (!value || value.length === 0) {
        return helpers.error("any.required");
      }
      const file = value[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        return helpers.error("any.invalid");
      }
      if (file.size > 2 * 1024 * 1024) {
        // Máx 2 MB
        return helpers.error("any.max");
      }
      return value;
    })
    .messages({
      "any.required": "La imagen es obligatoria",
      "any.invalid": "Solo se permiten JPG, PNG o WEBP",
      "any.max": "La imagen no puede superar los 2MB",
    }),
});
