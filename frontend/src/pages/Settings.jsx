import { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({ website: "", bio: "", gender: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved:", profile);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-orange-700 mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Website"
          className="w-full p-2 border rounded"
          value={profile.website}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          className="w-full p-2 border rounded"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={profile.gender}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
