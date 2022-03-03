import React, {useCallback, useState} from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const request = async (url, method = 'GET', body = null, headers = {}) => {}
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        // start
        setLoading(true)

        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            // setLoading(false)
            return data

        } catch (e) {
            console.log('Catch Exception:', e.message)
            // setLoading(false)
            setError(e.message);
            throw e;
        } finally {
            // stop
            setLoading(false)
        }
    }, []);

    // const clearError = () => setError(null)

    return {
        loading, request, error,
        clearError: useCallback(() => {
            setError(null)
        })
    }
}