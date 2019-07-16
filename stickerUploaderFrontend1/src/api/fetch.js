const baseUrl = 'https://stickerio-backend.herokuapp.com/';

export function getStickerById(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        }
    })
    .then(res => {
        return res.json();
    })
}

export function getStickers() {
    return fetch(`${baseUrl}/stickers`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => {
        return res.json();
    })
}

export function getStickerByName(name) {
    return fetch(`${baseUrl}/stickers/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        }
    })
    .then( res => {
        return res.json();
    })
}