import { withSessionRoute } from "@/lib/ironOptions";
import { updateUser } from "@/services/user.service";

export default withSessionRoute(userUpdate);

async function userUpdate(req, res) {
    const { phone, address, location, userId } = req.body;

    if (phone === undefined || address === undefined || location === undefined || userId === undefined || phone === 0 || address === '' || location === '') {
        res.json({ status: 400, message: "Invalid request" });
    }

    try{
        await updateUser(userId, { phone, address, location });
        res.json({ status: 200, message: "User updated successfully" });
    }
    catch(error){
        res.json({ status: 500, error });
    }

}
