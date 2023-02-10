const BASE_URL = 'https://auth.nomoreparties.co';
const getResponse = (res) => {
    return res.ok ? res.json() :
        res.status == 400 ?
            Promise.reject(`Ошибка: ${res.status} - не передано одно из полей`) :
            Promise.reject(`Ошибка: ${res.status} - пользователь с email не найден `);
}
const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(getResponse);
}

const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        }).then(getResponse);
}

const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(getResponse);
}

export {
    register,
    authorize,
    getContent
}