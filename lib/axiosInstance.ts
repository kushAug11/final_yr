// src/utils/axiosInstance.ts
import dotenv from 'dotenv';
import { config } from 'dotenv';
import axios from 'axios';
config();
const axiosInstance = axios.create({
    baseURL: 'https://06ld2m59-8000.inc1.devtunnels.ms', // Your FastAPI backend URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
