import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            console.error("Unauthorized access - redirecting to login");
            localStorage.removeItem("token");
            window.location.href = "/iniciar-sesion"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

const setToken = (token) => {
    localStorage.setItem("token", token);
}

const checkHealth = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/health");
        return response.data;
    } catch (error) {
        console.error("Error checking health:", error);
        throw error;
    }
}

export default {
    setToken,
    checkHealth,
}