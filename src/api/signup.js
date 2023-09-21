const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';  // 请确保这是您的 API 的正确基本 URL

async function signup(userData) {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
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

export { signup };
