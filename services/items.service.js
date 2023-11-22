import db from '@/lib/prisma'

export async function listItem(data){
    return await db.item.create({
        data
    })
}

export async function fetchAvailableItems(){
    return await db.item.findMany({
        where: {
            isAvailable: true
        }
    })
}

export async function fetchItemByCategory(cat){
    return await db.item.findMany({
        where: {
            category: cat
        }
    })
}

export async function fetchItem(id){
    return await db.item.findUnique({
        where: {
            id
        }
    })
}

export async function updateItem(id, data){
    return await db.item.update({
        where: {
            id
        },
        data
    })
}

// export async function deleteItem(id){
//     return await db.item.delete({
//         where: {
//             id
//         }
//     })
// }

export async function getRequestsOfItem(id){
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            RentRequest: true
        }
    })
}

export async function getCurrentBorrower(id){
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            ActiveRent: true
        }
    })
}

export async function getRentHistory(id){
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            OverRent: true
        }
    })
}
