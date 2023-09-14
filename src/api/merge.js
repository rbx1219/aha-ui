const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function mergeAccounts(errorCode, mergeKey) {
    const response = await fetch(`${BASE_URL}/auth/merge`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ errorCode, mergeKey })
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Account merge failed');
    }

    return await response.json();
}

// 其他的api请求...

export { mergeAccounts };

