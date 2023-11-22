import { hashSync } from "bcrypt";
import { createUser, fetchUser } from "@/services/user.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(SignUp);

async function SignUp(req, res) {
    const { email, name, password } = req.body;

    try {
        const Euser = await fetchUser(email);
        if (Euser) {
            return res.send({ status: 403, message: "User already exists" });
        }
        const response = await createUser({
            name: name,
            email: email,
            password: hashSync(password, 10),
        });

        const user = await fetchUser(email);
        req.session.user = user;
        await req.session.save();

        res.send({ status: 200, message: JSON.stringify(response) });
    }
    catch (error) {
        console.log(error);
        res.send({ status: 500, message: "Internal Server Error" });
    }

}