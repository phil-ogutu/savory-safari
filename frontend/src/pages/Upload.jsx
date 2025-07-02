import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/UI/Button";
import usePost from "../hooks/custom/usePost.hook";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function Upload() {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { PostData, message, setLoading, loading } = usePost(
    `http://localhost:5000/api/posts`
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('selectedFile',selectedFile)
    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }
    setLoading(true);
    try {
      // 1. Upload image to Cloudinary
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "ireporter"); // your preset
      data.append("cloud_name", "dtzodxlmb"); // your cloud name

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dtzodxlmb/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const cloudData = await cloudRes.json();
      setLoading(false);

      if (cloudData.url) {
        // 2. Post to your backend with the Cloudinary image URL
        const token = localStorage.getItem('token');
        console.log('token',token)
        if (token){
          const decoded = jwtDecode(token);
          console.log('decoded',decoded)
          const payload = {
            media_file: cloudData.url,
            caption,
            location_tag: location,
            category,
            type_food: type,
            price,
            restaurant_id: decoded.id,
          };
          try {
            await PostData(payload);
            setCaption("");
            setLocation("");
            setCategory("");
            setType("");
            setPrice("");
            setSelectedFile(null);
            toast.success("Post uploaded!", message);
            setTimeout(() => {
              navigate("/home");
            }, 1200);
          } catch (postErr) {
            toast.error("Failed to post. Please try again.");
            console.error(postErr);
          }
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-xl mx-auto px-10 py-8 bg-gray-100 rounded-xl mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload a new post
        </h2>
        <div className="mb-5 flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
              {selectedFile && (
                <span className="mt-2 text-xl text-orange font-semibold">
                  {selectedFile.name}
                </span>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              // className="hidden"
              onChange={(e) => {setSelectedFile(e.target.files[0])}}
            />
          </label>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-0"
        >
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Caption"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Location"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Category"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Type
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Type of Food"
              required
            />
          </div>
          <div className="mb-5 col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Price"
              required
            />
          </div>
          <Button
            content={loading ? "Uploading..." : "Upload"}
            type="submit"
            className="w-full col-span-2"
          />
        </form>
      </div>
    </div>
  );
}
