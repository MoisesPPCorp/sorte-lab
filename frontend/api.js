const API = "https://sorte-lab-production.up.railway.app";

function getToken() {
    return localStorage.getItem("token");
}

async function apiFetch(endpoint, options = {}) {

    const token = getToken();

    const response = await fetch(API + endpoint, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    return response.json();
}