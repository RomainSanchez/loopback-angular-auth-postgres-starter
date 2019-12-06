const nodemailer = require('nodemailer');

module.exports = {
  send: (to, subject, body) => {
    const transport = nodemailer.createTransport({
      host: "smtp.cdg29.fr",
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587,
      tls: { ciphers:'SSLv3' },
      auth: {
        user: 'rsanchez@cdg29.bzh',
        pass: 'rs@cdg29'
      }
    });

    const options = {
      from: 'ne-pas-repondre@instances.cdg29.bzh',
      to: to,
      subject: subject,
      text: 'Hello world ',
      html: body
    };

    transport.sendMail(options, function(error, info){
      if(error){
        return console.log(error);
      }

      console.log('Message sent: ' + info.response);
    });
  }
}
