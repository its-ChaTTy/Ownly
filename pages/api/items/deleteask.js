import { withSessionRoute } from "@/lib/ironOptions";
import { deleteRequestItem } from "@/services/items.service";


export default withSessionRoute(deleteItemRequest);

async function deleteItemRequest(req, res) {
    const { id, item } = req.body;

    if (!id || !item) {
        console.log(item,id);
        return res.json({ status: 400, message: "Item id and item name are required" });
    }

    try {
        const deletedItem = await deleteRequestItem(id, item);
        res.json({ status: 200, message: "Item deleted successfully", data: deletedItem });
    }
    catch (error) {
        console.error(error);
        res.json({ status: 500, message: "An error occurred while deleting item" });
    }
}
