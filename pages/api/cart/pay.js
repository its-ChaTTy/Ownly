import { withSessionRoute } from "@/lib/ironOptions";
import { payment } from "@/services/cart.service";

export default withSessionRoute(pay);

async function pay(req, res) {

    const { userId, rentReqId, amount, paymentId, imageURL } = req.body;

    if (!userId || !rentReqId || !amount || !paymentId || !imageURL) {
        return res.json({ status: 400, error: 'Invalid request' });
    }

    try {
        const data = {
            userId,
            rentReqId,
            amount,
            paymentId,
            imageURL
        }
        
        const response = await payment(data);
        // call mailer here
        res.json({ status: 200, response });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }


}