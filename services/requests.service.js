import db from '@/lib/prisma'

export async function createRequest (data) {
  return await db.rentRequest.create({
    data
  })
}

export async function getUserRequests(userId) {
  return await db.rentRequest.findMany({
    where: {
      userId
    }
  })
}

export async function getRequestById(id) {
  return await db.rentRequest.findUnique({
    where: {
      id
    }
  })
}

export async function updateRequest(id, data) {
  return await db.rentRequest.update({
    where: {
      id
    },
    data
  })
}

export async function deleteRequest(id) {
  return await db.rentRequest.delete({
    where: {
      id
    }
  })
}





