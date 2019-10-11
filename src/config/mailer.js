module.exports = {
  transporter: {
    host: 'mail.leonardosamara.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'informativo@leonardosamara.com',
      pass: 'AJ#z]XjUaG-8',
    },
    tls: { rejectUnauthorized: false },
  },
};
