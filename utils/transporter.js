import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    from: "ownlyco@gmail.com",
    auth:{
        user: "ownlyco@gmail.com",
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
    },
    secure: true
});

export default transporter;