export function nodeMailerConfig() {
  const config = {
    host:
      process.env.NODE_ENV === "production"
        ? "smtp.hostinger.com"
        : "smtp.ethernal.email",
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

  return config;
}
