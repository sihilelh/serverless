import { APP_CONFIG } from "@/config/app.config";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const generateHeaders = () => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    const lastAuthUser = localStorage.getItem(`CognitoIdentityServiceProvider.${APP_CONFIG.COGNITO_CLIENT_ID}.LastAuthUser`);

    if (lastAuthUser) {
        const accessToken = localStorage.getItem(`CognitoIdentityServiceProvider.${APP_CONFIG.COGNITO_CLIENT_ID}.${lastAuthUser}.accessToken`);
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }
    }

    return headers;
}
export const apiInstance = axios.create({
    baseURL: APP_CONFIG.API_URL,
});

apiInstance.interceptors.request.use((config) => {
    const headers = generateHeaders();
    Object.assign(config.headers, headers);
    return config;
});

export const httpGet = async (url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    const searchParams = new URLSearchParams();
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, value);
        });
    }
    return await apiInstance.get(`${url}?${searchParams.toString()}`, config);
}

export const httpPost = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return apiInstance.post(url, data, config);
}

export const httpPut = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return apiInstance.put(url, data, config);
}

export const httpDelete = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return apiInstance.delete(url, config);
}

export const httpPatch = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return apiInstance.patch(url, data, config);
}