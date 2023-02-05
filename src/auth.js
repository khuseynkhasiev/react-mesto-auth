
const BASE_URL ='https://auth.nomoreparties.co';
const getResponse = (res) => {
    return res.ok? res.json() : `Ошибка: ${res.status}`;
}
export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        }).then(getResponse);
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        }).then(getResponse);
}