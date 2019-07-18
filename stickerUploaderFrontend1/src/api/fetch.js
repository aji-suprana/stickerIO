const baseUrl = 'https://stickerio-backend.herokuapp.com';

/* USERS */
export function login(email, password) {
    return fetch (`${baseUrl}/auth/authentication`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        return res.json()
    })
}


/* STICKERS */
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