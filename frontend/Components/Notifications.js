import {getAllUser, getUserByEmail} from "../server/Api";

export async function sendLostPet(pet) {
    const users = await getAllUser(pet.coordinates.latitude, pet.coordinates.longitude)
    const tokens = users.data.map((user) => user.expoPushToken)
    const message = {
        to: tokens,
        title: 'Se perdio ' + pet.name,
        body: pet.description,
        data: {id: pet.id},
    }
    await fetchNotification(message)
}

export async function sendCommentNotifications(pet, userEmail) {
    const user = await getUserByEmail(pet.tutor)
    const tokens = user.data.expoPushToken
    const message = {
        to: tokens,
        title: 'Nuevo comentario sobre ' + pet.name,
        body: 'De parte de ' + userEmail,
        data: {id: pet.id},
    }

    await fetchNotification(message)
}

const fetchNotification = async (message) => {
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
}



