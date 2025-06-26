import { useState } from "react";

function useRegisterRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const register = async (restaurantData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/restaurants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurantData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, response };
}

export default useRegisterRestaurant;
