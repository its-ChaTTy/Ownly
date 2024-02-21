import { hashSync } from "bcrypt";
import { createUser, fetchUser } from "@/services/user.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(SignUp);

BigInt.prototype.toJSON = function () {
    return this.toString();
};

async function SignUp(req, res) {
    const { email, name, password, phone, address, location} = req.body;

    const emailRegex = /^[\w-\.]+@snu\.edu\.in$/;
    if (!emailRegex.test(email)) {
        return res.send({ status: 400, message: "Invalid email. Only @snu.edu.in emails are allowed." });
    }

    try {
        const Euser = await fetchUser(email);
        if (Euser) {
            return res.send({ status: 403, message: "User already exists" });
        }
        const response = await createUser({
            name: name,
            email: email,
            password: hashSync(password, 10),
            phone: phone,
            address: address,
            location: location
            
        });

        const user = await fetchUser(email);
        // Convert any BigInt values to strings before storing the user in the session
        const userForSession = Object.fromEntries(
            Object.entries(user).map(([key, value]) => [
                key,
                typeof value === 'bigint' ? value.toString() : value,
            ])
        );

        req.session.user = userForSession;
        await req.session.save();

        res.send({ status: 200, message: JSON.stringify(response) });
    }
    catch (error) {
        console.log(error);
        res.send({ status: 500, message: "Internal Server Error" });
    }
}