function getToken() {
    return localStorage.getItem("token");
}

async function apiFetch(url, options = {}) {

    const token = getToken();

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    return response.json();
}