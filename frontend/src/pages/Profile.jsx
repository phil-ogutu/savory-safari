import { User, Plus, Grid, MessageSquare, Heart, Share } from "lucide-react";
import useRestaurantProfile from "../hooks/useRestaurantProfile";
import Spinner from "../components/UI/Spinner";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const queryString = window.location.search;

  // Create a URLSearchParams object to parse the query string
  const params = new URLSearchParams(queryString);
  const profile_id = params.get('profile_id');
  const token = localStorage.getItem('token');
  let decoded;
  if (token){
    decoded = jwtDecode(token);
    console.log('decoded',decoded)
  }
  const { restaurant, loading } = useRestaurantProfile(profile_id || decoded?.id);

  if (loading || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex">
      <div className="flex-1 p-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-8 bg-gray-900 rounded-xl p-6 shadow-lg">
            {/* Profile Picture */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-md mb-2">
                <img
                  src={restaurant.photo_url}
                  className="w-full h-full object-cover rounded-full"
                  alt={restaurant.name}
                />
              </div>
              <span className="text-sm text-gray-400">{restaurant.mobile}</span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h1 className="text-3xl font-bold text-orange-400">
                  {restaurant.name}
                </h1>
                <div className="flex space-x-6 mt-2 sm:mt-0">
                  <span className="text-green-400 font-medium">• Open Now</span>
                  <span className="text-gray-400">Delivery: 30-45 min</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-lg text-white">About</span>
                <span className="text-lg text-gray-300">
                  <strong>{restaurant.posts.length}</strong> posts
                </span>
              </div>
              <div className="text-gray-300 text-base">
                <span>🍕 {restaurant.restaurant_bio}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>🕐 Open: 11AM - 11PM Daily</span>
                <span>📞 {restaurant.mobile}</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.posts &&
                restaurant.posts?.map((post) => (
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                    <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <img
                        src={
                          post.media_url ||
                          "https://i.pinimg.com/736x/8f/c6/3e/8fc63ecde415fc7e8119ee2b46c07be9.jpg"
                        }
                        alt={`Explore ${post.id}`}
                        className="w-full h-full object-cover aspect-square rounded-md"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{post.type_food}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {post.caption}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 font-bold">
                          KSh {post.price}
                        </span>
                        <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                          📍 {post.location_tag}
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
