import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentSection from "../Post/CommentSection";

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
          <div className="flex items-center gap-2 mb-4">
            <img src={post.userAvatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{post.username}</p>
              <p className="text-sm text-gray-500">{post.location}</p>
            </div>
          </div>
          {/* Comments Section */}
          <CommentSection postId={post.id} />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PostModal;
