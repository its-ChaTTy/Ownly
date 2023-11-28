import { withSessionRoute } from "@/lib/ironOptions";
import { listItem } from "@/services/items.service";

export default withSessionRoute(createItem);

async function createItem(req, res) {

    const { name, description, price, category, imageURL, userId } = req.body;

    try {
        const item = await listItem({
            name,
            description,
            price,
            category,
            imageURL,
            userId
        });
        res.json({ status: 200, item });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }


}
