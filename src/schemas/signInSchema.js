import Joi from 'joi';

const signInSchema = {
  schema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  validate(obj) {
    const { error } = this.schema.validate(obj, { abortEarly: false });
    const errors = error?.details.map((err) => err.message);
    return errors;
  },
};

export default signInSchema;
