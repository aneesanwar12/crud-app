const joi = require("joi");

const validation = (product) => {
  const validSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
  });
  return validSchema.validate(product);
};

const validatedProduct = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    next();
  };
};

module.exports = {
  validation,
  validatedProduct,
};
