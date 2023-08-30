const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class email {
  constructor(user, url) {
    this.to = user.email;
    this.username = user.userName;
    this.url = url;
    this.from = `Online Restaurant <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  //Send the actual email
  async send(subject) {
    //01-Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/emailResetLink.pug`, {
      username: this.username,
      url: this.url,
      subject,
    });

    //02-Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    //03-Create a transport and send an email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendpasswordReset() {
    await this.send(
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
