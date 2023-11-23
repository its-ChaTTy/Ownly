import { withSessionRoute } from "@/lib/ironOptions";
import { createRequest } from "@/services/requests.service";
import { fetchItem } from "@/services/items.service";

export default withSessionRoute(requestCreate);

async function requestCreate(req, res) {
    const { itemId, startDate, endDate, userId } = req.body;

    const item = await fetchItem(itemId);

    const days = calculateDays(startDate, endDate);
    const data = {
        itemId,
        startDate,
        endDate,
        userId,
        days: days,
        price: days * item.price
    }

    try {
        const request = await createRequest(data);
        res.json({ status: 200, request })
    } catch (error) {
        console.log(error)
        res.json({ status: 500, error })
    }
}

function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end - start);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}


