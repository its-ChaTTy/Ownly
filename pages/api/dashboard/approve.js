import { withSessionRoute } from "@/lib/ironOptions";
import { approvePayment, approvePayment2 } from "@/services/dashboard.service";
import transporter from "@/utils/transporter";
import { fetchItemUser } from "@/services/items.service";
import { appendNewMessage } from "@/services/messages.service";

export default withSessionRoute(approve);

async function approve(req, res) {

    const { id, id2, paymentId, amount } = req.body;

    if (id === undefined || id2 === undefined || paymentId === undefined || amount === undefined) {
        res.json({ status: 400, error: "Invalid data" });
        return;
    }

    try {
        const response = await approvePayment({ 'id': id });
        const owner = await fetchItemUser(response.itemId);
        await sendApprovalMail(response.User, owner.User);
        await approvePayment2({ 'id': id2 });
        await appendNewMessage({ 
            userId: response.User.id,
            message: "Your rent request has been approved, time to contact the owner"
        });

        res.json({ status: 200, response });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
}

async function sendApprovalMail(user, owner) {
    
    const mailData = {
        from: 'ownlyco@gmail.com',
        to: user.email,
        subject: 'Rent Request Approved',
        html: `<h1>Hi User,</h1><br><p>Your rent request has been approved.<br/>Owner name: ${owner.name}, <br/>Owner email: ${owner.email}, <br/>Owner phone: ${owner.phone},<br/> Owner address: ${owner.address}, <br/>Owner location: ${owner.location}</p>`
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent successfully");
        }
    });

}