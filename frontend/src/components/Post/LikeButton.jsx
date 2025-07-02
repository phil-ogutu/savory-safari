import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons"

const LikeButton = ({ liked, onClick,likesCount=0 }) => {
  return <button className="text-gray-600 hover:text-gray-700 text-2xl flex items-center gap-2" onClick={onClick}><FontAwesomeIcon color={liked? 'red' : ""} icon={faHeart}/><p className="text-sm">{likesCount}</p></button>;
};

export default LikeButton;
