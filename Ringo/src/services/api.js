import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import config from '../constants/config';

const api = axios.create({
    baseURL: config.API_URL,
});

api.interceptors.request.use(
    async (config) => {
        try{
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const token = JSON.parse(credentials.password);
                config.headers.Authorization = `Bearer ${token.accessToken}`;
            }
        } catch (error) {
            console.error('토큰 읽기 실패', error);
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('인증 실패: 다시 로그인해야 합니다.');
      await Keychain.resetGenericPassword();
    }
    return Promise.reject(error);
  }
);

//GET 함수
export const get = async (endpoint, options = {}) => {
    try {
        const response = await api.get(endpoint, { 
        ...options,
     });
     if (
        typeof response.data !== 'object' ||
        response.headers['content-type']?.includes('text/html')
     ) {
        throw new Error('서버 응답이 올바르지 않습니다.');
     }
     return {
        ...response.data,
        status: response.status,
     };
    } catch (error) {
        console.error(`GET 요청에러:`, error?.response?.data || error.message);
        throw error;
    }
};

//POST 함수
export const post = async (endpoint, data = {}, options = {}) => {
    try {
        const response = await api.post(endpoint, data, options);
        if (
            typeof response.data !== 'object' ||
            response.headers['content-type']?.includes('text/html')
        ) {
            throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        console.error(`POST 요청에러:`, error?.response?.data || error.message);
        throw error;
    }
};

//PUT 함수
export const put = async (endpoint, data = {}, options = {}) => {
    try {
        const response = await api.put(endpoint, data, options);
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        console.error(`PUT 요청에러:`, error?.response?.data || error.message);
        throw error;
    }
}

//PATCH 함수
export const patch = async (endpoint, data = {}, options = {}) => {
    try {
        const response = await api.patch(endpoint, data, options);
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        console.error(`PATCH 요청에러:`, error?.response?.data || error.message);
        throw error;
    }
};

//DELETE 함수
export const del = async (endpoint, options = {}) => {
    try {
        const response = await api.delete(endpoint, {
            ...options,
            data: {},
        });
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        console.error(`DELETE 요청에러:`, error?.response?.data || error.message);
        throw error;
    }
}

export default api;