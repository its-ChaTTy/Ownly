import db from "@/lib/prisma";

export async function fetchAllCompletedBorrowing(userId){
    return await db.overRent.findMany({
        where: {
            userId,
        },
    })
}

export async function fetchAllOngoingBorrowing(userId){
    return await db.activeRent.findMany({
        where: {
            userId,
        },
        // include: {
        //     item: true
        // }
    })
}