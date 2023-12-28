import db from "@/lib/prisma";

export async function fetchAllCompletedBorrowing(userId){
    return await db.overRent.findMany({
        where: {
            userId,
        },
        include: {
            item: true
        }
    })
}