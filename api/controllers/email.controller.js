import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import "dotenv/config";

const sendEmail = asyncHandler(async (data,req,res)=>{    //data is the object which contains the email and the subject and the message
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL,
            pass: process.env.MP,
        },
        });

      // async..await is not allowed in global scope, must use a wrapper
        async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Hey! 👻" <abc@gmail.com.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
        }

        main().catch(console.error);
})

export {sendEmail};