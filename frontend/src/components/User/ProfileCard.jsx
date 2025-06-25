import React from "react";
import FollowButton from "./FollowButton";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-sm mx-auto text-center">
      <img
        src={user.avatar}
        alt="user avatar"
        className="w-24 h-24 rounded-full mx-auto mb-3"
      />
      <h2 className="text-xl font-semibold">{user.username}</h2>
      <p className="text-gray-500 text-sm">{user.location}</p>
      <p className="text-gray-600 mt-2 text-sm">{user.bio}</p>
      <div className="mt-4">
        <FollowButton isFollowing={user.isFollowing} />
      </div>
    </div>
  );
};

export default ProfileCard;
