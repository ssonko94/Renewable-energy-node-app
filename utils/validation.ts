interface Schema {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
  rights: string;
}
interface Valid {
  validate: Function;
}

const validator = (schema: Valid) => (payload: Schema) =>
  schema.validate(payload, { abortEarly: false });

module.exports = validator;
