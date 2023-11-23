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
        for (let i = 0; i < currentRequests.length; i++) {
            const request = currentRequests[i];
            if ((new Date(request.startDate) <= new Date(endDate)) && (new Date(request.endDate) >= new Date(startDate))) {
                return res.json({ status: 400, message: "Item not available in the given time period" });
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

function isD1Greater(d1,d2){
    if(d1.getFullYear() > d2.getFullYear()){
        return true;
    }
    else if(d1.getFullYear() < d2.getFullYear()){
        return false;
    }
    else{
        if(d1.getMonth() > d2.getMonth()){
            return true;
        }
        else if(d1.getMonth() < d2.getMonth()){
            return false;
        }
        else{
            if(d1.getDate() > d2.getDate()){
                return true;
            }
            else if(d1.getDate() < d2.getDate()){
                return false;
            }
            else{
                return true;
            }
        }
    }
}

