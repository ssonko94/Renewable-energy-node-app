exports.validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
