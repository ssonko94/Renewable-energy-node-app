exports.postSignup = (req, res, next) => {
  const body = req.body;
  console.log(body);
  res.status(201).json({ message: "Succefully created an account" });
  next();
};
