import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([
    { id: 1, username: "Winnie", content: "This Looks tasty!" },
    { id: 2, username: "Dennis", content: "Where can I get this?" },
  ]);

  const [newComment, setNewComment] = useState("");

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

  return (
    <div className="px-2 pb-3">
      <div className="space-y-1 mb-2 text-sm">
        {comments.map((c) => (
          <div key={c.id}>
            <strong>{c.username}: </strong>
            {c.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button onClick={handleAddComment} className="bg-black text-white">
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
