import React from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold">Post Details - ID: {id}</h2>
      {/* we can render post details here */}
    </div>
  );
}
