import { withSessionRoute } from "@/lib/ironOptions";
import { updateRequest } from "@/services/requests.service";

export default withSessionRoute(requestUpdate);

async function requestUpdate(req, res) {

    const { id, userId, startDate, endDate } = req.body;

    try {
        const request = await updateRequest(id, { startDate, endDate }, userId);
        res.json({ status: 200, request })
    } catch (error) {
        res.json({ status: 500, error })
    }

}

