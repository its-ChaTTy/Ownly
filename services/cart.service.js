import db from '@/lib/prisma'

export async function initializeCart(data) {
    return db.cart.create({
        data
    })
}

export async function fetchCart(id) {
    return db.cart.findUnique({
        where: {
            id
        },
        include: {
            items: true
        }
    })
}

export async function addCartItem(data) {
    return db.cartItem.create({
        data
    })
}

export async function fetchCartId(userId) {
    const cart = await db.cart.findFirst({
        where: {
            userId
        }
    })
    return cart.id;
}