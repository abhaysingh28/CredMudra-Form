import axios from 'axios';

const baseURL = 'https://gateway.credmudra.com';

const apiService = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const apiAuthService = axios.create({
    baseURL: baseURL,
    // timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refressToken');
    const response = await axios.post(`${baseURL}/public/refresh-token`, {
        data: { refreshToken: refreshToken }
    });
    if (response.data?.status.code === 404) {
        alert(response.data.data);
        window.location.href = '/get-registered';
        return;
    } else {
        return response.data?.data?.accessToken;
    }
};
// Request interceptor
apiService.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
let isRefreshing = false;
let refreshSubscribers = [];
const onRefreshed = (accessToken) => {
    refreshSubscribers.forEach((callback) => callback(accessToken));
    refreshSubscribers = [];
};

apiService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push((accessToken) => {
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        resolve(apiService(originalRequest));
                    });
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            return new Promise((resolve, reject) => {
                refreshAccessToken()
                    .then((accessToken) => {
                        localStorage.setItem('accessToken', accessToken);
                        apiService.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        onRefreshed(accessToken);
                        resolve(apiService(originalRequest));
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }
        return Promise.reject(error);
    }
);
export default apiService;
