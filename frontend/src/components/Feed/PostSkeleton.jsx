import React from "react";

const PostSkeleton = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <div className="h-4 bg-gray-300 rounded-md mb-2" />
      <div className="h-4 bg-gray-300 rounded-md mb-2" />
      <div className="h-4 bg-gray-300 rounded-md" />
    </div>
  );
};

export default PostSkeleton;
