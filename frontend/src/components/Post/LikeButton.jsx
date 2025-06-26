import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons"

const LikeButton = ({ postId }) => {
  return <button className="text-gray-600 hover:text-gray-700 text-2xl"><FontAwesomeIcon icon ={faHeart}/></button>;
};

export default LikeButton;
