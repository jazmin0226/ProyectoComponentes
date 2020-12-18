//Dependencies
const nodemailer = require('nodemailer');

const transporterService =nodemailer.createTransport({
  service : 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


function sendEmail(sendData) {
  const mailOptions = {
    from: 'no-reply@componentes.com',
    to: sendData.to,
    subject: sendData.subject,
    text: sendData.text
  }

  transporterService.sendMail(mailOptions, (error, info) => {
    if(error){
      console.error(error);
    }

    console.log(info);
  });
}

module.exports = sendEmail;