import { useState, useCallback } from "react";


export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getResource = async (url) => {
        setLoading(true);
        let result = await fetch(url);
        
        if (!result.ok) {
          throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        setLoading(false);
        return await result.json();
    };


    

    const clearError = useCallback(() => setError(null), []);

    return {loading, getResource, error, clearError};
}