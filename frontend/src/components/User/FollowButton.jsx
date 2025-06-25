import React, { useState } from "react";
import { Button } from "../UI/Button";

const FollowButton = ({ isFollowing: initial }) => {
  const [isFollowing, setIsFollowing] = useState(initial);

  const handleToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <Button
      onClick={handleToggle}
      className={`px-6 ${
        isFollowing ? "bg-gray-300 text-black" : "bg-black text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
