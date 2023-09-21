// api/statistics.js
const BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

async function getActive(userData) {
    const response = await fetch(`${BASE_URL}/dashboard/statistics`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'getActive failed');
    }

    return await response.json();
}

async function getDashboardUsers(userData) {
    const response = await fetch(`${BASE_URL}/dashboard/users`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'getStatistic failed');
    }

    return await response.json();
}

export { getActive, getDashboardUsers };
