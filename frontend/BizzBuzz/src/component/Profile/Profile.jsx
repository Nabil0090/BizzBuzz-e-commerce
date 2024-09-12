import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const { removeAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3080/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setMessage("Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("An error occurred while fetching the profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      console.log(profile);
      const response = await fetch(
        `http://localhost:3080/usersUpdate/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );
      if (response.ok) {
        setMessage("Profile updated successfully!");
        setEditMode(false);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred while updating the profile.");
    }
  };

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`http://localhost:3080/users/${userId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setMessage("Profile deleted successfully!");
          localStorage.removeItem("userId"); // Clear local storage
          localStorage.removeItem("userType");
          removeAuth();
          navigate('/');
        } else {
          setMessage("Failed to delete profile.");
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
        setMessage("An error occurred while deleting the profile.");
      }
    }
  };

  if (!profile) {
    return <div className="text-center mt-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Profile
        </h2>
        {message && (
          <div className="mb-4 text-center text-red-500">{message}</div>
        )}
        {!editMode ? (
          <div>
            <p>
              <strong>Email:</strong> {profile.EMAIL}
            </p>
            <p>
              <strong>Name:</strong> {profile.NAME}
            </p>
            <p>
              <strong>Phone Number:</strong> {profile.PHONE_NO}
            </p>
            <p>
              <strong>Address:</strong> {profile.ADDRESS}
            </p>
            <p>
              <strong>User Type:</strong> {profile.USER_TYPE}
            </p>
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="EMAIL"
                value={profile.EMAIL}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="NAME"
                value={profile.NAME}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="PHONE_NO"
                value={profile.PHONE_NO}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <textarea
                name="ADDRESS"
                value={profile.ADDRESS}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                User Type
              </label>
              <select
                name="USER_TYPE"
                value={profile.USER_TYPE}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
