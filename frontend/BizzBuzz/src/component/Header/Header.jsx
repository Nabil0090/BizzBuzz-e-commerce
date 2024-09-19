import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { removeAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  function goToLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    removeAuth();
  }

  return (
    <div className="w-full h-16 bg-gray-800 shadow-md flex items-center justify-between px-8">
      <div
        className="text-white font-bold text-lg cursor-pointer hover:opacity-80"
        onClick={() => navigate("/")}
      >
        BizzBuzz
      </div>
      <div>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              onClick={goToLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
            <button
              onClick={() => navigate(`/profile`)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Profile
            </button>
            {userType === "Admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors duration-300"
              >
                Admin Dash
              </button>
            )}
            {(userType === "Buyer" || userType === "Seller") && (
              <button
                onClick={() => navigate("/cart")}
                className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors duration-300"
              >
                Cart
              </button>
            )}
            {userType === "Seller" && (
              <button
                onClick={() => navigate("/add_product")}
                className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors duration-300"
              >
                Add Product
              </button>
            )}
            {userType === "Seller" && (
              <button
                onClick={() => navigate("/edit_product")}
                className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors duration-300"
              >
                Edit Product
              </button>
            )}
            <button
              onClick={() => navigate(`/compalint`)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
