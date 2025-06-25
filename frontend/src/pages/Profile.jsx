import React from "react";
import ProfileCard from "../components/User/ProfileCard";

export default function Profile() {
  const mockUser = {
    username: "benjie_lubz",
    location: "Nairobi, Kenya",
    avatar: "https://i.pravatar.cc/100",
    bio: "Food explorer. I love traveling and documenting Kenyan cuisines.",
    isFollowing: false,
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <ProfileCard user={mockUser} />
    </div>
  );
}
