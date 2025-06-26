import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons"

const ShareButton = ({ postId }) => {
  return (
    <button className="text-gray-600 hover:text-gray-700 text-xl"><FontAwesomeIcon icon={faShareFromSquare} /></button>
  );
};

export default ShareButton;
