import React from "react";
import { Button } from "../UI/Button";

const OrderPanel = ({ post }) => {
  if (!post?.price || !post?.itemName) return null;

  const handleOrder = () => {
    alert(`Ordering ${post.itemName} for Ksh ${post.price}`);
    // hapa ndiyo we can integrate payment or Glovo link
  };

  return (
    <div className="bg-orange-100 rounded-md p-2 text-sm shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{post.itemName}</span>
        <span>Ksh {post.price}</span>
      </div>
      <Button
        onClick={handleOrder}
        className="bg-orange-500 hover:bg-orange-600 text-white w-full"
      >
        Go to Order
      </Button>
    </div>
  );
};

export default OrderPanel;

// we will need post object to include fields like itemName and price in the fake/mock data on backend
