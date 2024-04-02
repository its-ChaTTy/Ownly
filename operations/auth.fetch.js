export async function login(data) {
    return await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}

export async function register(data) {
    return await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}

export async function logout() {
    return await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}

export async function sendOtp(data) {
    return await fetch('/api/auth/otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}

export async function updatePassword(data) {
    return await fetch('/api/user/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}