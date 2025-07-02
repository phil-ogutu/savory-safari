import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import usePost from "../../hooks/custom/usePost.hook";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const CommentSection = ({ postId, post_comments, setcommentLikesCount }) => {
  const [comments, setComments] = useState(post_comments);

  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const {PostData} = usePost(`http://localhost:5000/api/posts/${postId}`);

  const token = localStorage.getItem('token');
  let decoded;
  if (token){
    decoded = jwtDecode(token);
    console.log('decoded',decoded)
  }
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: new Date(Date.now()),
      user: decoded?.name,
      content: newComment,
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
    PostData({user_id:decoded?.id,content: newComment,});
    setcommentLikesCount(post_comments?.length+1)
  };

  const visibleComments = showAll ? comments : comments?.slice(0, 1)

  return (
    <div className="px-2 pb-3">
      <div className="flex px-2 mb-2 text-sm flex-col h-100">
        {visibleComments?.reverse().map((c,idx) => (
          <div key={c.id || idx}>
            <strong>{c.user}: </strong>
            {c.content}
          </div>
        ))}
      </div>
      {comments?.length > 1 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-gray-500 text-sm font-semibol ml-2 hover:text-gray-800"
        >
          View all {comments?.length} comments
        </button>
      )}
      {decoded?.role === 'user' && 
      (<div className="flex items-center border-t pt-2 mt-2 text-sm">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter'){
              handleAddComment()
            }
          }}
          placeholder="Add a comment..."
          className="flex-1 outline-none border-none px-2 py-1 text-sm placeholder-gray-400"
        />
      </div>)}
    </div>
  );
};

export default CommentSection;
