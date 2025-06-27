import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from "@fortawesome/free-regular-svg-icons"; // <-- Add this line

const CommentButton = ({ postId }) => {
  return (
    <button className="text-gray-600 hover:text-gray-700 text-2xl">
      <FontAwesomeIcon icon ={faComment}/>
    </button>
  );
};

export default CommentButton;