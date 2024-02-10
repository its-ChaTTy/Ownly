import { withSessionRoute } from "@/lib/ironOptions";
import { approvePayment, approvePayment2 } from "@/services/dashboard.service";
import transporter from "@/utils/transporter";
import { fetchItemUser } from "@/services/items.service";

export default withSessionRoute(approve);

async function approve(req, res) {

    const { id, id2, paymentId, amount } = req.body;

    if(id === undefined || id2 === undefined || paymentId === undefined || amount === undefined){
        res.json({ status: 400, error: "Invalid data" });
        return;
    }

    try {
        const response = await approvePayment({ 'id': id });
        // console.log(response, "response\n");
        const owner = await fetchItemUser(id);
        // console.log(owner, "owner\n");
        await sendApprovalMail(response.User,owner.User);
        res.json({ status: 200, response });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
}

async function sendApprovalMail(user,owner) {
    const mailData = {
        from: 'ownlyco@gmail.com',
        to: user.email,
        subject: 'Rent Request Approved',
        html: `<h1>Hi User,</h1><br><p>Your rent request has been approved.Owner name: ${owner.name}, Owner email: ${owner.email}, Owner phone: ${owner.phone}, Owner address: ${owner.address}, Owner location: ${owner.location}</p>`
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