function useLoginRestaurant() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/restaurants/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, token, error };
}
