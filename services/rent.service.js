import db from "@/lib/prisma";

export async function fetchAllCompletedLending(userId){
    return await db.overRent.findMany({
        where: {
            userId,
        },
        include: {
            item: true
        }
    })
}