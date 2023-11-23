import { withSessionRoute } from "@/lib/ironOptions";
import { deleteRequest } from "@/services/requests.service";

export default withSessionRoute(requestDelete);

async function requestDelete(req, res) {
    const { id, userId } = req.body;

    try {
        const request = await deleteRequest(id, userId);
        res.json({ status: 200, request })
    } catch (error) {
        console.log(error)
        res.json({ status: 500, error })
    }
}

