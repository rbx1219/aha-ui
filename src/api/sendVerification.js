const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function sendVerification(userId) {
    const response = await fetch(`${BASE_URL}/auth/resend-verification/${userId}`);

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Resend failed');
    }

    return await response.json();
}

// 其他的api请求...

export { sendVerification };

