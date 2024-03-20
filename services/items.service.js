import db from '@/lib/prisma'

export async function listItem(data) {
    return await db.item.create({
        data
    })
}

export async function fetchAvailableItems() {
    return await db.item.findMany({
        where: {
            isAvailable: true
        }
    })
}

export async function fetchAllItems() {
    return await db.item.findMany({
        where: {
            isAvailable: true
        }
    })
}

export async function fetchItemByCategory(cat) {
    return await db.item.findMany({
        where: {
            category: cat
        }
    })
}

export async function fetchItem(id) {
    return await db.item.findUnique({
        where: {
            id
        }
    })
}

export async function fetchItemUser(id) {
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            User: true
        }
    })
}

export async function updateItem(id, data, userId) {
    return await db.item.update({
        where: {
            id,
            userId
        },
        data
    })
}

export async function deleteItem(id, userId) {
    return await db.item.update({
        where: {
            id,
            userId
        },
        data: {
            userId: 0,
            isAvailable: false,
        }
    })
}

export async function getRequestsOfItem(id) {
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            RentRequest: true
        }
    })
}

export async function getCurrentBorrower(id) {
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            ActiveRent: true
        }
    })
}

export async function getRentHistory(id) {
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            OverRent: true
        }
    })
}

export async function isItemByUser(id, userId) {
    return await db.item.findFirst({
        where: {
            id,
            userId,
            isAvailable: true
        },
    })
}

export async function getActiveRent(id) {
    return await db.item.findUnique({
        where: {
            id
        },
        include: {
            ActiveRent: true
        }
    })
}


export async function getAllItemsByUser(userId) {
    return await db.item.findMany({
        where: {
            userId,
        }
    })
}

export async function searchItems(query) {
    return await db.item.findMany({
        where: {
            OR: [{
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            },
            {
                description: {
                    contains: query,
                    mode: "insensitive"
                }
            },],
            isAvailable: true,
        }
    });
}

export async function requestItem(item) {
    return await db.request.create({
        item: item
    })
}

export async function deleteRequestItem(id, item) {
    return await db.request.delete({
        where: {
            id,
            item
        }
    })
}

export async function fetchAllItemRequests() {
    return await db.request.findMany()
}
