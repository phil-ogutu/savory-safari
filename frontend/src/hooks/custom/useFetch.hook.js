import { useState } from "react";

function useFetch(url) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);
    const [error, setError] = useState(null);

    const FetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const response = await res.json();
            console.log('response',response)
            setData(response)
            return response
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

  return {FetchData, loading, data, error };
}

export default useFetch;