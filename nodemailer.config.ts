require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASSWORD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user,
    pass,
  },
});

const sendConfirmationEmail = (
  name: string,
  email: string,
  confirmationCode: string
) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8080/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err: Error) => console.log(err));
};

export { sendConfirmationEmail };
