import { withSessionRoute } from "@/lib/ironOptions";
import { updateItem } from "@/services/items.service";

export default withSessionRoute(updateItemRoute);

async function updateItemRoute(req, res) {

    const { id, name, description, price, category, imageURL, userId } = req.body;

    try {
        const item = await updateItem(id, {
            name,
            description,
            price,
            category,
            imageURL,
        }, userId);
        res.json({ status: 200, item });
    }
    catch (error) {
        res.json({ status: 500, error });
    }
}
