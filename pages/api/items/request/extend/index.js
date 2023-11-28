import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(requestExtend);

async function requestExtend(req, res) {

    const { itemId, userId, id, extendDate } = req.body;

    // check if the item renterr want to extend is currently borrowed by him
    // if not return error

    // check item is available to rent or not

    // check if the date till which he want to extend is available
    // i.e. no other accepted requests by owner till that date
    // else error


}