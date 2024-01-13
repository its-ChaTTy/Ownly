import { ownerApprovedRequests } from "@/services/requests.service";

// /g8298urjwisr/meowmeowmeow/doc/dashboard
export async function getServerSideProps(context) {
    const user = context.req.session.user;

    if (user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
        };
    }

    const approvedRequests = await ownerApprovedRequests();

    return {
        props: { user: user, pendingRequests: JSON.parse(JSON.stringify(approvedRequests)) },
    }

}

// [
//     {
//         id: 19,
//         itemId: 8,
//         userId: 8,
//         startDate: 2023 - 12 - 29T07:07: 10.068Z,
//         endDate: 2023 - 12 - 30T18: 30:00.000Z,
//         ownerStatus: 'ACCEPTED',
//         adminStatus: 'ACCEPTED',
//         days: 2,
//         price: 80,
//         cartId: 5
//     },
//     {
//         id: 25,
//         itemId: 10,
//         userId: 9,
//         startDate: 2023 - 12 - 30T14: 40: 17.226Z,
//         endDate: 2023 - 12 - 30T18: 30:00.000Z,
//         ownerStatus: 'ACCEPTED',
//         adminStatus: 'ACCEPTED',
//         days: 1,
//         price: 200,
//         cartId: 6
//     },
//     {
//         id: 17,
//         itemId: 5,
//         userId: 3,
//         startDate: 2023 - 12 - 29T05:08: 18.320Z,
//         endDate: 2023 - 12 - 30T18: 30:00.000Z,
//         ownerStatus: 'ACCEPTED',
//         adminStatus: 'ACCEPTED',
//         days: 2,
//         price: 400,
//         cartId: 1
//     },
//     {
//         id: 26,
//         itemId: 7,
//         userId: 11,
//         startDate: 2023 - 12 - 30T14: 45: 52.771Z,
//         endDate: 2024-01-05T18: 30:00.000Z,
//         ownerStatus: 'ACCEPTED',
//         adminStatus: 'PENDING',
//         days: 7,
//         price: 7,
//         cartId: 8
//     }
// ]

function dashboard({ user, pendingRequests }) {
    console.log(pendingRequests)
    return (
        <div>dashboard</div>
    )
}

export default dashboard