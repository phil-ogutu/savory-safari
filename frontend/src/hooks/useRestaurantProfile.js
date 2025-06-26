import { useState, useEffect } from "react";

function useRestaurantProfile(restaurantId) {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);
    fetch(`http://localhost:5000/restaurants/${restaurantId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch restaurant profile");
        }
        return res.json();
      })
      .then(setRestaurant)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  return { restaurant, error, loading };
}

export default useRestaurantProfile;
