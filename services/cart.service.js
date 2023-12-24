import Cart from '@/components/Cart/Cart'
import db from '@/lib/prisma'

export async function initializeCart(data) {
    return db.cart.create({
        data
    })
}

export async function fetchCart(userId) {
    return db.cart.findFirst({
        where: {
            userId
        },
        include: {
            CartItem: true,
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