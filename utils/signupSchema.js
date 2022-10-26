const Joi = require("joi");
const validate = require("./validation");

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  rights: Joi.string().valid("admin", "member").required(),
});

const signUpValidator = validate(schema);

module.exports = signUpValidator;
