import { withSessionRoute } from "@/lib/ironOptions";
import { hashSync } from "bcrypt";
import { updatePassword } from "@/services/user.service";
import { fetchUser } from "@/services/user.service";

export default withSessionRoute(passwordUpdate);

async function passwordUpdate(req, res) {
    const { email, password, id } = req.body;

    const user = await fetchUser(email);
    
    if (!user) {
        return res.json({
            status: 500,
            message: "User not found, try signing up..."
        });
    }

    try {
        const hashedPassword = hashSync(password, 10);
        const user = await updatePassword(id, email, hashedPassword);
        res.json({ status: 200, message: "Password updated successfully" });
    } catch (e) {
        res.json({ status: 500, message: "Error updating password" });
    }

}
