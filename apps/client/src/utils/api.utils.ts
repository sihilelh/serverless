import { AxiosError, type AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
    status: number;
    data: T;
}

export interface ApiErrorResponse {
    status: number;
    message: string;
    error: string;
    data?: any;
}

export type ErrorCallback = (status: number, error: ApiErrorResponse) => void;

export interface ErrorCallbacks {
    [statusCode: number]: ErrorCallback;
}

/**
 * Handles API responses and extracts data from the backend wrapper format
 * @param response - Axios response from API
 * @returns Unwrapped data from the response
 */
export const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    return response.data.data;
};

/**
 * Handles API errors with status-specific callbacks
 * @param error - Axios error
 * @param errorCallbacks - Object mapping status codes to callback functions
 * @throws The original error if no callback is defined for the status
 */
export const handleApiError = (
    error: AxiosError<ApiErrorResponse>,
    errorCallbacks?: ErrorCallbacks
): never => {
    const status = error.response?.status;
    const errorData = error.response?.data;

    if (status && errorCallbacks && errorCallbacks[status] && errorData) {
        errorCallbacks[status](status, errorData);
        // If callback handled the error, throw a handled error
        throw new Error(`Handled error: ${errorData.message}`);
    }

    // If no callback defined for this status, throw the original error
    throw error;
};

/**
 * Wraps an API call with response handling and error callbacks
 * @param apiCall - Function that returns a Promise of AxiosResponse
 * @param errorCallbacks - Optional error callbacks for specific status codes
 * @returns Promise of unwrapped data
 */
export const withApiHandling = async <T>(
    apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
    errorCallbacks?: ErrorCallbacks
): Promise<T> => {
    try {
        const response = await apiCall();
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error as AxiosError<ApiErrorResponse>, errorCallbacks);
    }
};
