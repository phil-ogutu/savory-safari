import React, { useState } from 'react';
import { User, Plus, Grid, MessageSquare, Heart, Share } from 'lucide-react';

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <nav className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-500 text-white">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="font-medium">Home</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-gray-300">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <span>Search</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-gray-300">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <span>Explore</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-gray-300">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <span>Profile</span>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-8 mb-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                🍕
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-light">mama_mia_pizzeria</h1>
                <button 
                  onClick={handleFollowClick}
                  className={`px-6 py-1.5 rounded text-sm font-medium transition-colors ${
                    isFollowing 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-6 py-1.5 bg-green-600 rounded text-sm hover:bg-green-700 font-medium">
                  Order Now
                </button>
              </div>

              {/* Stats */}
              <div className="flex space-x-8 mb-4">
                <span><strong>247</strong> dishes</span>
                <span><strong>1.2K</strong> followers</span>
                <span><strong>4.8</strong> ⭐ rating</span>
              </div>

              {/* Bio */}
              <div>
                <h2 className="font-semibold mb-1">Mama Mia Pizzeria</h2>
                <p className="text-gray-300 mb-2">
                  🍕 Authentic Italian Pizza & Pasta<br/>
                  📍 Downtown Main Street, Nairobi<br/>
                  🕐 Open: 11AM - 11PM Daily<br/>
                  📞 +254 700 123 456
                </p>
                <div className="flex space-x-4">
                  <span className="text-green-400 font-medium">• Open Now</span>
                  <span className="text-gray-400">Delivery: 30-45 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="py-8">
            {activeTab === 'menu' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Menu Items */}
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="text-6xl">🍕</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Margherita Pizza</h3>
                    <p className="text-gray-400 text-sm mb-2">Fresh mozzarella, tomato sauce, basil</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold">KSh 1,200</span>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                  <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-6xl">🍝</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Spaghetti Carbonara</h3>
                    <p className="text-gray-400 text-sm mb-2">Creamy sauce, pancetta, parmesan</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold">KSh 950</span>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                  <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-6xl">🥗</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Caesar Salad</h3>
                    <p className="text-gray-400 text-sm mb-2">Romaine lettuce, croutons, parmesan</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold">KSh 650</span>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                      J
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">John Doe</span>
                        <div className="flex text-yellow-400">
                          ⭐⭐⭐⭐⭐
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">
                        Amazing pizza! The crust was perfect and the ingredients were fresh. 
                        Definitely coming back for more.
                      </p>
                      <span className="text-gray-500 text-sm">2 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">Mary Smith</span>
                        <div className="flex text-yellow-400">
                          ⭐⭐⭐⭐⭐
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">
                        Best Italian restaurant in town! The pasta was cooked to perfection 
                        and the service was excellent.
                      </p>
                      <span className="text-gray-500 text-sm">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'info' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Restaurant Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Address</h4>
                    <p className="text-white">123 Main Street, Downtown, Nairobi</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Phone</h4>
                    <p className="text-white">+254 700 123 456</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Hours</h4>
                    <div className="text-white">
                      <p>Monday - Sunday: 11:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Cuisine Type</h4>
                    <p className="text-white">Italian, Pizza, Pasta</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Delivery Options</h4>
                    <p className="text-white">Delivery, Takeout, Dine-in</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Help</a>
          <a href="#" className="hover:text-gray-400">Privacy</a>
          <a href="#" className="hover:text-gray-400">Terms</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          © 2024 FoodieApp
        </p>
      </div>

      {/* Messages Button */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
        <MessageSquare size={20} />
        <span className="ml-2 text-sm">Messages</span>
      </button>
    </div>
  );
}