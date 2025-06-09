import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔐 Request Interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Response Interceptor
axiosClient.interceptors.response.use(
    
    (response) => {
        const accessToken = response.data && response.data.token;

        if (accessToken) {
            localStorage.setItem("ACCESS_TOKEN", accessToken);
        }
        return response;
    },
    (error) => {
        const { response } = error;

        try {
        // 🔒 Token expired or unauthorized
        if (response?.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");

            // Full-page reload (safe fallback)
            window.location.href = "/login";
        }

        // 🧨 Optional: Handle 403 / 404 here too
        if (response?.status === 403) {
            console.warn("Access forbidden");
        }

        throw error;
        } catch (error) {
            console.error("Error in response interceptor:", error);
            throw error;
        }
    }
);

export default axiosClient;
