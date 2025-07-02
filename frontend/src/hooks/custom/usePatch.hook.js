import { useState } from "react";

function usePatch(url) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const PatchData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to Patch data");

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { PatchData, loading, message, error, setLoading };
}

export default usePatch;
