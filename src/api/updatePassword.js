const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function updatePassword(userData) {
    const response = await fetch(`${BASE_URL}/user/update-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (response.redirected) {
        window.location.href = response.url;
        return;
    }

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
    }
    return await response.json();
}

export { updatePassword };
