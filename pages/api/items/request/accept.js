import { withSessionRoute } from "@/lib/ironOptions";
import { isItemByUser } from "@/services/items.service";
import { getActiveRent } from "@/services/items.service";
import { acceptRequest } from "@/services/requests.service";

export default withSessionRoute(requestAccept);

async function requestAccept(req, res) {

    // id is the id of the request
    // itemId is the id of the item, check if the user is the owner of the item and if the item is available
    // userId is the id of the user, check if the user is the owner of the item
    // startDate is the start date of the request
    // endDate is the end date of the request
    // check if the item is available in the given time period i.e no other request is accepted for the same item in the given time period
    const { id, itemId, userId, startDate, endDate } = req.body;

    const item = await isItemByUser(itemId, userId);
    if (!item) {
        return res.json({ status: 404, message: "Item not found" });
    }

    const requests = await getActiveRent(itemId);
    if (requests) {
        const currentRequests = requests.ActiveRent;
        console.log(currentRequests);
        for (let i = 0; i < currentRequests.length; i++) {
            const request = currentRequests[i];
            if (request.startDate <= endDate && request.endDate >= startDate) {
                return res.json({ status: 404, message: "Item not available in the given time period" });
            }
        }
    }

    try {
        const request = await acceptRequest(id);
        return res.json({ status: 200, message: "Request accepted", request });
    }
    catch (error) {
        return res.json({ status: 500, message: "Internal server error" });
    }

}
