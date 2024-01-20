import { withSessionRoute } from "@/lib/ironOptions";
import { searchItems } from "@/services/items.service";

export default withSessionRoute(search);

async function search(req, res) {

    const { query } = req.body;

    try {
        const items = await searchItems(query);
        res.json({ status: 200, items });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }

}
