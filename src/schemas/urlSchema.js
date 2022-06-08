import Joi from 'joi';

const urlSchema = {
  schema: Joi.object({
    url: Joi.string().uri().required(),
  }),

  validate(obj) {
    const { error } = this.schema.validate(obj, { abortEarly: false });
    const errors = error?.details.map((err) => err.message);
    return errors;
  },
};

export default urlSchema;
