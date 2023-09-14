// api/login.js
const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function login(userData) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
    }

    return await response.json();
}

export { login };
