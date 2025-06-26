import React from "react";
import LikeButton from "../Post/LikeButton";
import FavouriteButton from "../Post/FavouriteButton";
import ShareButton from "../Post/ShareButton";
import OrderPanel from "../Post/OrderPanel";
import CommentSection from "../Post/CommentSection";
import CommentButton from "../Post/CommentButton"

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-5">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.userAvatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-2">
            <p className="font-semibold">{post.username}</p>
            <span className="text-sm text-gray-500">{post.location}</span>
          </div>
        </div>
        {/* for Post Image(s) or Video */}
        <div className="w-full h-64 bg-gray-100 mb-2 overflow-hidden rounded">
          <img
            src={post.media[0]}
            alt="media"
            className="w-full h-full object-cover"
          />
        </div>
        {/* hizi ni Action Buttons */}
        <div className="flex justify-between items-center px-2 py-1">
          <div className="flex gap-4">
            <LikeButton postId={post.id} />
            <CommentButton postId={post.id} />
            <ShareButton postId={post.id} />
          </div>
          <OrderPanel post={post} />
        </div>
        {/* hapa ni for Caption */}
        {/* <p className="px-2 text-sm mt-1">{post.caption}</p> */}
      </div>
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostCard;
