// api/login.js
const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function getUserBySession() {
    const response = await fetch(`${BASE_URL}/user/user-by-session`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
    }

    return await response.json();
}

export { getUserBySession };
