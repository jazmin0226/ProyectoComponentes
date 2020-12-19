//Dependencies
const nodemailer = require('nodemailer');

const transporterService =nodemailer.createTransport({
  service : 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

 
function sendEmail(sendData, callback) {
  const mailOptions = {
    from: 'Proyecto componentes <foobar@example.com>',
    to: sendData.to,
    subject: sendData.subject,
    html: sendData.html
  }

  transporterService.sendMail(mailOptions, (error, info) => {
    if(error){
      console.error(error);
    }

    callback();
  });
}

module.exports = sendEmail;