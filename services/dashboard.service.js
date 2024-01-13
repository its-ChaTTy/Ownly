import db from '@/lib/prisma'

export async function approvePayment(data) {
    return await db.rentRequest.update({
        where: {
            id: data.id
        },
        data: {
            adminStatus: 'ACCEPTED'
        }
    })
}

export async function rejectPayment(data) {
    return await db.rentRequest.update({
        where: {
            id: data.id
        },
        data: {
            adminStatus: 'REJECTED'
        }
    })
}

export async function approvePayment2(data) {
    return await db.payments.update({
        where: {
            id: data.id
        },
        data: {
            isPaidToTeam: true,
        }
    })
}