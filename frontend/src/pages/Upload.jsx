import React from "react";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";

export default function Upload() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Upload a New Dish</h2>
      <form className="space-y-4">
        <Input placeholder="Title or Caption" />
        <Input type="file" accept="image/*" />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
}
