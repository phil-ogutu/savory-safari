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
import usePost from "../../hooks/custom/usePost.hook.js";
import { jwtDecode } from "jwt-decode";
import useFetch from "../../hooks/custom/useFetch.hook.js";
import { Link } from "react-router-dom";

const PostCard = ({ postData }) => {
  const [post,setPost]=useState(postData)
  const [showModal, setShowModal] = useState(false);
  const [postLiked, setpostLiked] = useState(post?.liked || false);
  const [postLikesCount, setpostLikesCount] = useState(post?.likes || 0);
  const [commentLikesCount, setcommentLikesCount] = useState(post?.comments?.length || 0);
  const {PostData} = usePost(`http://localhost:5000/api/posts/${postData?.id}`);
  const {FetchData} = useFetch(`http://localhost:5000/api/posts/${postData?.id}`);
  
  const handleLikePost=async()=>{
    const token = localStorage.getItem('token');
    console.log('token',token)
    if (token){
      const decoded = jwtDecode(token);
      console.log('decoded',decoded)
      PostData({user_id:decoded?.id,content: null,});
  
      if(post?.liked){
        setpostLiked(false);
        setpostLikesCount(postLikesCount != 0? postLikesCount-1:0)
      }else{
        setpostLiked(true);
        setpostLikesCount(postLikesCount+1)
      }
      // console.log(await FetchData());
      setPost(await FetchData());
    }
  }
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
              <Link
                to={`/profile?profile_id=${post?.restaurant?.id}`}
                className="flex items-center space-x-3 p-2 rounded hover:bg-light-orange text-orange-700"
              >
                <p className="font-semibold text-lg">{post?.restaurant?.name}</p> 
              </Link>
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
              post?.media_url || 
              'https://i.pinimg.com/736x/8f/c6/3e/8fc63ecde415fc7e8119ee2b46c07be9.jpg'}
            alt="media"
            className="w-full h-full object-cover"
          />
        </div>
        {/* hizi ni Action Buttons */}
        <div className="flex justify-between items-center px-2 py-1">
          <div className="flex gap-4">
            <LikeButton postId={post?.id} liked={postLiked} likesCount={postLikesCount} onClick={(()=>{handleLikePost()})}/>
            <button className="text-gray-600 hover:text-gray-700 text-2xl flex items-center gap-2">
              <FontAwesomeIcon icon ={faComment} onClick={() => setShowModal(true)}/>
              <p className="text-sm">{commentLikesCount}</p>
            </button>
            <ShareButton postId={post?.id} />
          </div>
          {/* <OrderPanel post={post} /> */}
        </div>
        {/* hapa ni for Caption */}
        <p className="text-sm mt-1">caption: {post?.caption}</p>
      </div>
      <CommentSection postId={post?.id} post_comments={post?.comments} setcommentLikesCount={setcommentLikesCount}/>
      <PostModal isOpen={showModal} onClose={() => setShowModal(false)} post={post} />
    </div>
  );
};

export default PostCard;
