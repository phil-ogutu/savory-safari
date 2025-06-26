import { useState } from "react";

function usePostInteraction(postId) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const interact = async (interactionData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interactionData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Interaction failed");

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return { interact, message, error };
}

export default usePostInteraction;
