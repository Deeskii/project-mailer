import 'dotenv/config'
import nodemailer from 'nodemailer'


export default async function main(subject, text) {
    let senderEmail = process.env.EMAIL
    let pass = process.env.PASS
    let port = process.env.PORT


    let trans = nodemailer.createTransport({
        service: "gmail",
        port: port,
        secure: true,
        auth: {
            user: senderEmail,
            pass: pass
        }
    });

    let recip = {
        from: senderEmail,
        to: senderEmail,
        subject: subject,
        text: text
    }

    trans.sendMail(recip, (err, info) => {
        if (err) {
            console.log(`##### ${err}`);
        } else {
            console.log(`Email Sent: ${info.response}`);
        }
    })
}

//main()
