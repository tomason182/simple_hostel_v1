import SMTPTransport from "nodemailer/lib/smtp-transport";

export function nodeMailerConfig(): SMTPTransport.Options {
  console.log("smtp-user", process.env.SMTP_SERVER_USER);
  console.log("smtp-pass", process.env.SMTP_SERVER_PASS);
  return {
    host:
      process.env.NODE_ENV === "production"
        ? "smtp.hostinger.com"
        : "smtp.ethereal.email",
    port: process.env.NODE_ENV === "production" ? 465 : 587,
    secure: process.env.NODE_ENV === "production",
    auth: {
      user: process.env.SMTP_SERVER_USER,
      pass: process.env.SMTP_SERVER_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  };

}
