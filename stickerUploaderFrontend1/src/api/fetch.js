const baseUrl = 'http://localhost:3000';

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