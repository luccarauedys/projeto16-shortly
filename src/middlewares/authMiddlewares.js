import signUpSchema from './../schemas/signUpSchema.js';
import signInSchema from './../schemas/signInSchema.js';

export const validateSignUpInfos = (req, res, next) => {
  const signUpInfos = req.body;
  const err = signUpSchema.validate(signUpInfos);
  if (err) return res.status(422).send(err);
  next();
};

export const validateSignInInfos = (req, res, next) => {
  const signInInfos = req.body;
  const err = signInSchema.validate(signInInfos);
  if (err) return res.status(422).send(err);
  next();
};
