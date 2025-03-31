import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_ID = "smartplacement57@gmail.com";
const EMAIL_PASS = "zpvb dqfq xzsb obwr";

export const sendMail = async (email, type, otp = "", reason = "") => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_ID,
            pass: EMAIL_PASS,
        },
    });

    let mailOptions = {};

    if (type === "otp") {
        console.log(email)
        mailOptions = {
            from: EMAIL_ID,
            to: email,
            subject: "OTP Verification",
            html: `
            <div style="font-family: Helvetica, Arial, sans-serif; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <p style="font-size: 1.1em">Hi,</p>
                    <p>Thank you for choosing SPM System. Use the following OTP to complete your Sign Up process. OTP is valid for 2 minutes.</p>
                    <h2 style="background: #00466a; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${otp}</h2>
                    <p style="font-size: 0.9em;">Regards,<br />SPM System</p>
                    <hr style="border-top: 1px solid #eee" />
                </div>
            </div>`,
        };
    } else if (type === "rejected") {
        mailOptions = {
            from: EMAIL_ID,
            to: email,
            subject: "Application Rejection - SPM System",
            html: `
            <div style="font-family: Helvetica, Arial, sans-serif; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <p style="font-size: 1.1em">Hi,</p>
                    <p>We regret to inform you that your application to SPM System has been rejected.</p>
                    <p>Reason: ${reason}</p>
                    <p style="font-size: 0.9em;">Regards,<br />SPM System</p>
                    <hr style="border-top: 1px solid #eee" />
                </div>
            </div>`,
        };
    } else if (type === "approved") {
        mailOptions = {
            from: EMAIL_ID,
            to: email,
            subject: "Application Approved - SPM System",
            html: `
            <div style="font-family: Helvetica, Arial, sans-serif; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <p style="font-size: 1.1em">Hi,</p>
                    <p>Congratulations! Your application to SPM System has been approved. We're excited to have you onboard!</p>
                    <p style="font-size: 0.9em;">Regards,<br />SPM System</p>
                    <hr style="border-top: 1px solid #eee" />
                </div>
            </div>`,
        };
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`${type} mail sent to ${email}`);
        return true;
    } catch (error) {
        console.error(`Error in sending ${type} mail:`, error);
        return false;
    }
};
