// import React, { useEffect, useState } from "react";
// import PostCard from "../components/Feed/PostCard";
// import PostSkeleton from "../components/Feed/PostSkeleton";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   HomeIcon,
//   SearchIcon,
//   CompassIcon,
//   UploadIcon,
//   UserIcon,
//   SettingsIcon,
//   LogOutIcon,
// } from "lucide-react"; // Have had to rename imports to avoid naming conflicts
// import { AppLayout } from "../layouts/AppLayout";

// export default function HomePage() {
//   // Also had to rename function to avoid naming conflict
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Temporary mock before we implement the backend
//         const data = [
//           {
//             id: 1,
//             username: "benjie",
//             userAvatar: "/avatar.png",
//             location: "Nairobi",
//             media: ["/sample-food1.jpg"],
//             caption: "Sukuma wiki and ugali 🍽️",
//           },
//           {
//             id: 2,
//             username: "james",
//             userAvatar: "/avatar2.png",
//             location: "DianiBeach",
//             media: ["/sample-food2.jpg"],
//             caption: "Grilled fish with pilau 🐟",
//           },
//           {
//             id: 3,
//             username: "kikco",
//             userAvatar: "/avatar3.png",
//             location: "Nairobi",
//             media: ["/sample-food3.jpg"],
//             caption: "Kikco shelves 🍰",
//           },
//           {
//             id: 4,
//             username: "chef",
//             userAvatar: "/avatar4.png",
//             location: "Mombasa",
//             media: ["/sample-food4.jpg"],
//             caption: "Spicy chicken wings 🌶️",
//           },
//           {
//             id: 5,
//             username: "foodie",
//             userAvatar: "/avatar5.png",
//             location: "Kisumu",
//             media: ["/sample-food5.jpg"],
//             caption: "Fresh juice and snacks 🍹",
//           },
//           {
//             id: 6,
//             username: "baker",
//             userAvatar: "/avatar6.png",
//             location: "Eldoret",
//             media: ["/sample-food6.jpg"],
//             caption: "Homemade bread 🍞",
//           },
//           {
//             id: 7,
//             username: "barista",
//             userAvatar: "/avatar7.png",
//             location: "Nakuru",
//             media: ["/sample-food7.jpg"],
//             caption: "Coffee and cake ☕🍰",
//           },
//           {
//             id: 8,
//             username: "gourmet",
//             userAvatar: "/avatar8.png",
//             location: "Mombasa",
//             media: ["/sample-food8.jpg"],
//             caption: "Seafood platter 🦐",
//           },
//           {
//             id: 9,
//             username: "vegan",
//             userAvatar: "/avatar9.png",
//             location: "Nairobi",
//             media: ["/sample-food9.jpg"],
//             caption: "Vegan salad 🥗",
//           },
//           {
//             id: 10,
//             username: "bbqmaster",
//             userAvatar: "/avatar10.png",
//             location: "Kilifi",
//             media: ["/sample-food10.jpg"],
//             caption: "Barbecue ribs 🍖",
//           },
//           // add other posts
//         ];
//         setPosts(data);
//       } catch (error) {
//         console.error("Failed to fetch posts", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <AppLayout>
//       {" "}
//       {/* we use this AppLayout to handle layout */}
//       <div className="flex h-screen">
//         {/* <Sidebar userName={user?.name || "Guest"} /> */}
//         <div className="flex-1 overflow-y-auto p-6 bg-yellow-50">
//           {loading
//             ? Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)
//             : posts.map((post) => <PostCard key={post.id} post={post} />)}
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

import React, { useEffect, useState } from "react";
import PostCard from "../components/Feed/PostCard";
import PostSkeleton from "../components/Feed/PostSkeleton";
import { useAuth } from "../contexts/AuthContext";
import { AppLayout } from "../layouts/AppLayout"; // Corrected import path
import {
  HomeIcon,
  SearchIcon,
  CompassIcon,
  UploadIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react"; // Corrected import names to avoid naming conflicts

export default function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]); // Fixed typo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Temporary mock before we implement the backend
        const data = [
          {
            id: 1,
            username: "benjie",
            userAvatar: "/avatar.png",
            location: "Nairobi",
            media: ["/sample-food1.jpg"],
            caption: "Sukuma wiki and ugali 🍽️",
          },
          {
            id: 2,
            username: "james",
            userAvatar: "/avatar2.png",
            location: "DianiBeach",
            media: ["/sample-food2.jpg"],
            caption: "Grilled fish with pilau 🐟",
          },
          {
            id: 3,
            username: "kikco",
            userAvatar: "/avatar3.png",
            location: "Nairobi",
            media: ["/sample-food3.jpg"],
            caption: "Kikco shelves 🍰",
          },
          {
            id: 4,
            username: "chef",
            userAvatar: "/avatar4.png",
            location: "Mombasa",
            media: ["/sample-food4.jpg"],
            caption: "Spicy chicken wings 🌶️",
          },
          {
            id: 5,
            username: "foodie",
            userAvatar: "/avatar5.png",
            location: "Kisumu",
            media: ["/sample-food5.jpg"],
            caption: "Fresh juice and snacks 🍹",
          },
          {
            id: 6,
            username: "baker",
            userAvatar: "/avatar6.png",
            location: "Eldoret",
            media: ["/sample-food6.jpg"],
            caption: "Homemade bread 🍞",
          },
          {
            id: 7,
            username: "barista",
            userAvatar: "/avatar7.png",
            location: "Nakuru",
            media: ["/sample-food7.jpg"],
            caption: "Coffee and cake ☕🍰",
          },
          {
            id: 8,
            username: "gourmet",
            userAvatar: "/avatar8.png",
            location: "Mombasa",
            media: ["/sample-food8.jpg"],
            caption: "Seafood platter 🦐",
          },
          {
            id: 9,
            username: "vegan",
            userAvatar: "/avatar9.png",
            location: "Nairobi",
            media: ["/sample-food9.jpg"],
            caption: "Vegan salad 🥗",
          },
          {
            id: 10,
            username: "bbqmaster",
            userAvatar: "/avatar10.png",
            location: "Kilifi",
            media: ["/sample-food10.jpg"],
            caption: "Barbecue ribs 🍖",
          },
          // Add more posts as needed
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
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto p-6 bg-yellow-50">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)
          : posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
