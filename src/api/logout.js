// api/login.js
const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Logout failed');
    }
}

export { logout };
