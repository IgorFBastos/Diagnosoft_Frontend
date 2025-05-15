


const API_BASE_URL = import.meta.env.VITE_API_URL; 

const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Erro ao acessar ${url}:`, errorText);
            throw new Error(errorText || "Erro na requisição.");
        }

        return response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

export default {
    get: (endpoint) => request(endpoint, { method: "GET" }),
    post: (endpoint, body) =>
        request(endpoint, { method: "POST", body: JSON.stringify(body) }),
    put: (endpoint, body) =>
        request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
