import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url,
        method = 'GET',
        body = null,
        headers = {
            'X-RapidAPI-Key': 'ba6217ec96msh17b47eb552b4d88p1cbcbdjsn897fc12c4ea6',
            'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }) => {
    
            setLoading(true);

            try {
                const response = await fetch(url, {method, body, headers});
                if(!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }
                const data = await response.json();
                setLoading(false);
                console.log(data)
                return data;
                
            } catch(e) {
                setLoading(false);
                setError(e.message);
                throw e;
            }
    }, [])

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};

    }

