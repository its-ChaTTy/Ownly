import { withSessionRoute } from "@/lib/ironOptions";
import { customAlphabet } from "nanoid";
import transporter from "@/utils/transporter";
import { fetchUser } from "@/services/user.service";
import { hashSync } from "bcrypt";

export default withSessionRoute(otpRoute);

async function otpRoute(req, res) {
    const { email } = req.body;

    const user = await fetchUser(email);

    if (!user) {
        return res.json({
            status: 500,
            message: "User not found, try signing up..."
        });
    }

    const otp = customAlphabet("1234567890abcdefghij");
    const otpCode = otp(6);

    try{
        var mailOptions = {
            from: "ownlyco@gmail.com",
            to: email,
            subject: "OTP for Password Reset",
            html: `<h1>Your OTP is ${otpCode}</h1>`
        };
        await transporter.sendMail(mailOptions);
        res.json({ status: 200, message: "OTP sent successfully", otp: `${hashSync(otpCode, 10)}`, id: user.id });
    }
    catch(e){
        res.json({ status: 500, message: "Error sending OTP" });
    }


}