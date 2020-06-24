const nodemailer = require('nodemailer');


class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SECRET
            }
        });
        this.mailOptions = {
            from: 'aadminmeetup@gmail.com'
        }
    };

    sendEmail(options){
    
        let mailOptions = {
            ...this.mailOptions,
            ...options,
        }
    
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    }
}

module.exports = new Mailer();