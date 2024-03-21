import { withSessionRoute } from "@/lib/ironOptions";
import { requestItem } from "@/services/items.service";

export default withSessionRoute(askForItem);


async function askForItem(req, res) {
    const { item } = req.body;

    if (!item) {
        return res.json({ status: 400, message: "Item not found" });
    }

    try {
        const itemR = await requestItem(item);
        res.json({ status: 200, itemR });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }

}