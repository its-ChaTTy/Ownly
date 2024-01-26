import { withSessionRoute } from "@/lib/ironOptions";
import { approvePayment, approvePayment2 } from "@/services/dashboard.service";
import transporter from "@/utils/transporter";

export default withSessionRoute(approve);

// {
//     id: 39,
//     itemId: 8,
//     userId: 1,
//     startDate: 2024-01-14T13:35:35.046Z,
//     endDate: 2024-01-17T18:30:00.000Z,
//     days: 4,
//     price: 160,
//     cartId: 3,
//     adminStatus: 'ACCEPTED',
//     ownerStatus: 'ACCEPTED',
//     paymentsId: null,
//     User: {
//       email: 'ps@snu.edu.in',
//       name: 'Sujith',
//       address: 'moye moye',
//       phone: 1234567890,
//       location: 'daadrii'
//     }
//   }

async function approve(req, res) {
    const { id1, id2 } = req.body;

    try {
        const response = await approvePayment({ 'id': id1 });
        const response2 = await approvePayment2({ 'id': id2 });
        await sendApprovalMail(response.User);
        res.json({ status: 200, response });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, error });
    }
}

async function sendApprovalMail(user) {
    const mailData = {
        from: 'ownlyco@gmail.com',
        to: user.email,
        subject: 'Rent Request Approved',
        html: `<h1>Hi User,</h1><br><p>Your rent request has been approved.Owner name: ${user.name}, Owner address: ${user.address}, Owner phone: ${user.phone}, Owner location: ${user.location}</p>`
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    });

}