const nodemailer = require('nodemailer');

const sendEmail = async(mail,name)=>{

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, 
        auth: {
            user: 'alejandra76@ethereal.email',
            pass: '66wFdutCuVRaHf4ns6'
        },
      });

      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: mail, // list of receivers
        subject: "Register Confirmation", // Subject line
        text: `Desde AppMeetup queremos ${name} darle la bienveida . Disfrute de nuestros multiples servicios.`, // plain text body
        html: "<b>Desde <h1>AppMeetup</h1> queremos darle la bienvenida. Disfrute de nuestros multiples servicios.</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
  sendEmail
}






// class Mailer {
//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.SECRET
//             }
//         });
//         this.mailOptions = {
//             from: 'aadminmeetup@gmail.com'
//         }
//     };

//     sendEmail(options){
    
//         let mailOptions = {
//             ...this.mailOptions,
//             ...options,
//         }
    
//         this.transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//         })
//     }
// }

module.exports = {
    sendEmail
}