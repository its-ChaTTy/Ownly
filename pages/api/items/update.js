import { withSessionRoute } from "@/lib/ironOptions";
import { updateItem } from "@/services/items.service";

export default withSessionRoute(updateItemRoute);

async function updateItemRoute(req, res) {

    const { id, name, description, price, category, imageURL, userId } = req.body;
    const data = {
        name,
        description,
        price,
        category,
        imageURL,
    }

    try {
        const item = await updateItem(id, data, userId);
        res.json({ status: 200, item });
    }
    catch (error) {
        res.json({ status: 500, error });
    }
}
