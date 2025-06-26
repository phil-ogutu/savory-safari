import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([
    { id: 1, username: "Winnie", content: "This Looks tasty!" },
    { id: 2, username: "Dennis", content: "Where can I get this?" },
  ]);

  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);


  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      username: "You",
      content: newComment,
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const visibleComments = showAll ? comments : comments.slice(0, 1)

  return (
    <div className="px-2 pb-3">
      <div className="flex px-2 mb-2 text-sm flex-col h-100">
        {visibleComments.map((c) => (
          <div key={c.id}>
            <strong>{c.username}: </strong>
            {c.content}
          </div>
        ))}
      </div>
      {comments.length > 1 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-gray-600 text-m ml-5 hover:text-gray-800"
        >
          ...more
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
