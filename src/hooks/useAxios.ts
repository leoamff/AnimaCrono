import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface UseAxiosResult<T, E = unknown> {
    data: T | null;
    loading: boolean;
    error: E | null;
    executeRequest: (body?: unknown, params?: Record<string, unknown>) => Promise<T>;
}

function useAxios<T = unknown, E = unknown>(
    url: string,
    method: HttpMethod = 'get',
    initialData: T | null = null
): UseAxiosResult<T, E> {
    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<E | null>(null);

    const executeRequest = useCallback(
        async (body: unknown = null, params: Record<string, unknown> = {}): Promise<T> => {
            setLoading(true);
            setError(null);

            try {
                let response: AxiosResponse<T>;
                switch (method) {
                    case 'get':
                        response = await axios.get<T>(url, { params });
                        break;
                    case 'post':
                        response = await axios.post<T>(url, body, { params });
                        break;
                    case 'put':
                        response = await axios.put<T>(url, body, { params });
                        break;
                    case 'delete':
                        response = await axios.delete<T>(url, { params, data: body });
                        break;
                    case 'patch':
                        response = await axios.patch<T>(url, body, { params });
                        break;
                    default:
                        throw new Error(`HTTP method '${method}' not supported.`);
                }
                setData(response.data);
                return response.data;
            } catch (err) {
                setError(err as E);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url, method]
    );

    useEffect(() => {
        if (method === 'get') {
            executeRequest();
        }
    }, [method, executeRequest]);

    return { data, loading, error, executeRequest };
}

export default useAxios;