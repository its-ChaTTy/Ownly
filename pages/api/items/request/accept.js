import { withSessionRoute } from "@/lib/ironOptions";
import { isItemByUser } from "@/services/items.service";
import { getActiveRent } from "@/services/items.service";
import { acceptRequest } from "@/services/requests.service";
import transporter from "@/utils/transporter";

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
        console.log(request);
        // need to fetch the user email from reqquest.userId
        // await sendOwnerApprovalMail(user);
        return res.json({ status: 200, message: "Request accepted", request });
    }
    catch (error) {
        return res.json({ status: 500, message: "Internal server error" });
    }

}

// {
//     id: 49,
//     itemId: 14,
//     userId: 15,
//     startDate: 2024-02-08T15:42:46.458Z,
//     endDate: 2024-02-16T18:30:00.000Z,
//     days: 9,
//     price: 1107,
//     cartId: 12,
//     adminStatus: 'PENDING',
//     ownerStatus: 'ACCEPTED',
//     paymentsId: null
//   }

async function sendOwnerApprovalMail(user) {
    const mailData = {
        from: 'ownlyco@gmail.com',
        to: user.email,
        subject: 'Owner Rent Request Approved, Time to Pay',
        html: `<h1>Hi User,</h1><br><p>Your rent request has been approved by owner, Time to Pay</p>`
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

