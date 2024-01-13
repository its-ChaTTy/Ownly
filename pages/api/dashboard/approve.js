import { withSessionRoute } from "@/lib/ironOptions";
import { approvePayment, approvePayment2 } from "@/services/dashboard.service";

export default withSessionRoute(approve);

async function approve(req, res) {
    const { id1, id2 } = req.body;

    try {
        const response = await approvePayment({ 'id': id1 });
        const response2 = await approvePayment2({ 'id': id2 })
        res.json({ status: 200, response });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
}