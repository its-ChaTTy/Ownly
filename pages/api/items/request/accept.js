import { withSessionRoute } from "@/lib/ironOptions";
import { isItemByUser } from "@/services/items.service";
import { getActiveRent } from "@/services/items.service";
import { acceptRequest } from "@/services/requests.service";
import transporter from "@/utils/transporter";
import { appendNewMessage } from "@/services/messages.service";

export default withSessionRoute(requestAccept);

async function requestAccept(req, res) {

    // id is the id of the request
    // itemId is the id of the item, check if the user is the owner of the item and if the item is available
    // userId is the id of the user, check if the user is the owner of the item
    // startDate is the start date of the request
    // endDate is the end date of the request
    // check if the item is available in the given time period i.e no other request is accepted for the same item in the given time period

    const { id, itemId, userId, startDate, endDate } = req.body;
    const item = await isItemByUser(itemId, userId);
    if (!item) {
        return res.json({ status: 404, message: "Item not found" });
    }

    const requests = await getActiveRent(itemId);
    if (requests) {
        const currentRequests = requests.ActiveRent;
        for (let i = 0; i < currentRequests.length; i++) {
            const request = currentRequests[i];
            if ((new Date(request.startDate) <= new Date(endDate)) && (new Date(request.endDate) >= new Date(startDate))) {
                return res.json({ status: 400, message: "Item not available in the given time period" });
            }
        }
    }

    try {
        const request = await acceptRequest(id);
        // console.log(request);
        // need to fetch the user email from reqquest.userId
        await sendOwnerApprovalMail(request);
        await appendNewMessage({
            userId: request.userId,
            message: "Your rent request has been approved by the owner, Time to Pay"
        });
        return res.json({ status: 200, message: "Request accepted", request });
    }
    catch (error) {
        return res.json({ status: 500, message: "Internal server error" });
    }

}

// {
//     id: 50,
//     itemId: 17,
//     userId: 15,
//     startDate: 2024-02-10T09:18:37.201Z,
//     endDate: 2024-02-17T18:30:00.000Z,
//     days: 8,
//     price: 552,
//     cartId: 12,
//     adminStatus: 'PENDING',
//     ownerStatus: 'ACCEPTED',
//     paymentsId: null,
//     User: {
//       id: 15,
//       email: 'ps335@snu.edu.in',
//       password: '$2b$10$WqSRlZKG8QPMEI1T.p5kVOwPFabf4um/QdCN/fnM55N3b3H0JtJtG',
//       name: 'Sujith',
//       address: '123456789o',
//       phone: 1234567890,
//       location: '123456789o',
//       isVerified: false,
//       totalEarned: 0,
//       profilePic: 'https://aniaodrkdkwrtfkhpjgp.supabase.co/storage/v1/object/public/profile-photos/15/profile'
//     }
//   }

async function sendOwnerApprovalMail(request) {
    const mailData = {
        from: 'ownlyco@gmail.com',
        to: request.User.email,
        subject: 'Owner Rent Request Approved, Time to Pay',
        html: `<h1>Hi ${request.User.name},</h1><br><p>Your rent request has been approved by owner, Time to Pay at <a href="http://ownly.co.in/cart/pay?id=${request.id}&user=${request.userId}&price=${request.price}">here</a></p>`
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(info);
            console.log("Mail Sent")
        }
    });
    
}