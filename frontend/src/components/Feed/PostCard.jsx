import React, { useState } from "react";
import LikeButton from "../Post/LikeButton";
import FavouriteButton from "../Post/FavouriteButton";
import ShareButton from "../Post/ShareButton";
import OrderPanel from "../Post/OrderPanel";
import CommentSection from "../Post/CommentSection";
import CommentButton from "../Post/CommentButton"
import PostModal from "./PostModal";
import { timeAgo } from '../utilities.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faComment } from "@fortawesome/free-regular-svg-icons";

const PostCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md mb-5">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={
              post?.restaurant?.photo_url ||
              'https://i.pinimg.com/736x/8b/36/9f/8b369fefca44952ef36cc09f830c00e7.jpg'
            }
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-2">
            <div className="flex align-center gap-2 items-center">
              <p className="font-semibold text-lg">{post?.restaurant?.name}</p> 
              <FontAwesomeIcon icon ={faCircleDot} size="xs"/> 
              <p className="text-xs">{timeAgo(post?.created_at)}</p>
            </div>
            <span className="text-sm text-gray-500">{post?.location_tag}</span>
          </div>
        </div>
        {/* for Post Image(s) or Video */}
        <div className="w-full h-64 bg-gray-100 mb-2 overflow-hidden rounded">
          <img
            src={
              post.media_url || 
              'https://i.pinimg.com/736x/8f/c6/3e/8fc63ecde415fc7e8119ee2b46c07be9.jpg'}
            alt="media"
            className="w-full h-full object-cover"
          />
        </div>
        {/* hizi ni Action Buttons */}
        <div className="flex justify-between items-center px-2 py-1">
          <div className="flex gap-4">
            <LikeButton postId={post?.id} />
            <button className="text-gray-600 hover:text-gray-700 text-2xl">
              <FontAwesomeIcon icon ={faComment} onClick={() => setShowModal(true)}/>
            </button>
            <ShareButton postId={post?.id} />
          </div>
          {/* <OrderPanel post={post} /> */}
        </div>
        {/* hapa ni for Caption */}
        <p className="text-sm mt-1">caption: {post?.caption}</p>
      </div>
      <CommentSection postId={post?.id} post_comments={post.comments}/>
      <PostModal isOpen={showModal} onClose={() => setShowModal(false)} post={post} />
    </div>
  );
};

export default PostCard;
