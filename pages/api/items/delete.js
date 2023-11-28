import { withSessionRoute } from "@/lib/ironOptions";
import { deleteItem } from "@/services/items.service";

export default withSessionRoute(itemDelete);

async function itemDelete(req, res) {

    const { id, userId } = req.body;

    try {
        const item = await deleteItem(id, userId);
        res.json({ status: 200, item });
    }
    catch (error) {
        res.json({ status: 500, error });
    }

}
