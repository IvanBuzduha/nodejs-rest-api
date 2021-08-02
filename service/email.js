const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
        case 'development': this.link = 'https://phonebook-ivan-bii33.netlify.app/'
            break
        case 'production': this.link = 'link to product'
            break
        default:  this.link = 'https://phonebook-ivan-bii33.netlify.app/'
            break
    }
  }

  #createTemplate(verifyToken,  name ) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'default',
      product: {
        name: 'Contacts',
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro: 'Welcome to the Contacts aplication',
        action: {
          instructions: 'To complete registration click on this button',
          button: {
            color: '#22BC66',
            text: 'Verify account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro: "Need help, or have questions? Just reply to this email,we'd love to help",
      },
    }

    return mailGenerator.generate(template);
  };

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: process.env.SENDGRID_MAIL_FROM,
      subject: 'Confirmation of registration',
      html: emailBody,
    }
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
