import db from '@/lib/prisma'

// model Message {
//     id      Int  @id @default(autoincrement())
//     userId  Int
//     message Json
//     User    User @relation(fields: [userId], references: [id])
//   }

export async function fetchMessagesOfUser(userId) {
    return db.message.findFirst({
        where: {
            userId: userId
        }
    })
}

export async function appendNewMessage(data) {
    const currentMessages = await fetchMessagesOfUser(data.userId);
    if (currentMessages === null) {
        return db.message.create({
            data
        })
    }
    else {
        const newMessages = currentMessages.message;
        newMessages.push(data.message);
        // only keep the last 5 messages
        if (newMessages.length > 5) {
            newMessages.shift();
        }
        
        return db.message.update({
            where: {
                userId: data.userId
            },
            data: {
                message: newMessages
            }
        })
    }
}


// export async function requestAnItem(item){
    
// }


