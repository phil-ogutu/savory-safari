import React, { useEffect, useState } from "react";
import PostCard from "../components/Feed/PostCard";
import PostSkeleton from "../components/Feed/PostSkeleton";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       try {
  //         const res = await fetch("https://api.example.com/posts");
  //         const data = await res.json();
  //         setPosts(data);
  //       } catch (error) {
  //         console.error("Failed to fetch posts", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchPosts();
  //   }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Temporary mock before we impliment the backend
        const data = [
          {
            id: 1,
            username: "benjie",
            userAvatar: "/avatar.png",
            location: "Nairobi",
            media: ["/sample-food.jpg"],
            caption: "Sukuma wiki and ugali 🍽️",
          },
        ];
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">SavorySafari Feed</h1>
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
