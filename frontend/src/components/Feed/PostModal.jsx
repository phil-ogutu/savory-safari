import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentSection from "../Post/CommentSection";
import { timeAgo } from '../utilities.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";

const PostModal = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 flex items-center justify-center">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-1 ">
        <DialogPanel className="fixed space-y-4 border bg-white p-4">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-5 h-5" />
          </button>

          {/* Post Header */}
          <div className="ml-2">
            <div className="flex align-center gap-2 items-center">
              <p className="font-semibold text-lg">{post?.restaurant?.name}</p> 
              <FontAwesomeIcon icon ={faCircleDot} size="xs"/> 
              <p className="text-xs">{timeAgo(post?.created_at)}</p>
            </div>
            <span className="text-sm text-gray-500">{post?.location_tag}</span>
          </div>
          {/* Comments Section */}
          <CommentSection postId={post.id} post_comments={post.comments}/>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PostModal;
