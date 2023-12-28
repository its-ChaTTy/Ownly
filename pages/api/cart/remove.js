import { withSessionRoute } from "@/lib/ironOptions";
import { deleteCartItem } from "@/services/cart.service";

export default withSessionRoute(removeFromCart);

async function removeFromCart(req, res) {
    const { cartItemId } = req.body;

    if (!cartItemId) {
        return res.json({ status: 400, error: 'Invalid request' });
    }

    try {
        const cartItem = await deleteCartItem(cartItemId);
        res.json({ status: 200, cartItem });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
}