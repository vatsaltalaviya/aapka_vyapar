const nodeMailer = require("nodemailer");

module.exports.sendOTP = async (email, otp) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
            user: 'millieandvecna1101@gmail.com',
            pass: 'euvbdhycfdpvyfxv',
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "OTP for reset password",
        text: `Your OTP is ${otp}`,
    });
}