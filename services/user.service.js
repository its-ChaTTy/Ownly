import db from '@/lib/prisma'

export async function fetchUser(email) {
    return db.user.findUnique({
        where: {
            email,
        },
    });
}

export async function createUser(data) {
    return db.user.create({
        data,
    });
}

export async function updateUser(id, data) {
    return db.user.update({
        where: {
            id,
        },
        data,
    });
}

export async function deleteUser(id) {
    return db.user.delete({
        where: {
            id,
        },
    });
}

export async function fetchUserById(id) {
    return db.user.findUnique({
        where: {
            id,
        },
        include: {
            items: true,
            RentRequest: true,
            ActiveRent: true,
            OverRent: true,
        },
    });
}


export async function getUserItems(id) {
    return db.user.findUnique({
        where: {
            id,
        },
        include: {
            items: true,
        },
    });
}

export async function getUserRentRequests(id) {
    return db.user.findUnique({
        where: {
            id,
        },
        include: {
            RentRequest: true,
        },
    });
}

export async function getUserActiveRents(id) {
    return db.user.findUnique({
        where: {
            id,
        },
        include: {
            ActiveRent: true,
        },
    });
}

export async function getUserRentHistory(id) {
    return db.user.findUnique({
        where: {
            id,
        },
        include: {
            OverRent: true,
        },
    });
}

