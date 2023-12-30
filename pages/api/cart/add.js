import { withSessionRoute } from "@/lib/ironOptions";
import { addCartItem, fetchCartId } from "@/services/cart.service";

export default withSessionRoute(addToCart);

async function addToCart(req, res) {
    const { itemId, startDate, endDate, price, days, userId } = req.body;

    if (!itemId || !startDate || !endDate || !price || !days || !userId) {
        return res.json({ status: 400, error: 'Invalid request' });
    }

    if (startDate > endDate || startDate === endDate || price <= 0 || days <= 0) {
        return res.json({ status: 400, error: 'Invalid request' });
    }

    try {
        const cartId = await fetchCartId(userId);
        const data = {
            itemId,
            cartId,
            startDate,
            endDate,
            price,
            days
        }
        const cartItem = await addCartItem(data);
        res.json({ status: 200, cartItem });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
}