// src/utils/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://06ld2m59-8000.inc1.devtunnels.ms/', // Your FastAPI backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
