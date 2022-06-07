import Joi from 'joi';

const signUpSchema = {
  schema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
  }),

  validate(obj) {
    const { error } = this.schema.validate(obj, { abortEarly: false });
    const errors = error?.details.map((err) => err.message);
    return errors;
  },
};

export default signUpSchema;
