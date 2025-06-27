import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import usePost from "../../hooks/custom/usePost.hook";

const CommentSection = ({ postId, post_comments }) => {
  const [comments, setComments] = useState(post_comments);

  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const {PostData} = usePost(`http://localhost:5000/api/posts/${postId}`);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      username: "You",
      content: newComment,
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
    PostData({user_id:1,content: newComment,})
  };

  const visibleComments = showAll ? comments : comments?.slice(0, 1)

  return (
    <div className="px-2 pb-3">
      <div className="flex px-2 mb-2 text-sm flex-col h-100">
        {visibleComments.map((c,idx) => (
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
      <div className="flex items-center border-t pt-2 mt-2 text-sm">
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
      </div>
    </div>
  );
};

export default CommentSection;
