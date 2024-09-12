import React, { useState } from "react";

export default function AddProduct() {
  const userId = localStorage.getItem("userId");

  const [product, setProduct] = useState({
    quantity: "",
    description: "",
    price: "",
    available: "",
    name: "",
    picture: "",
    seller_id: userId,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle image file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setProduct((prev) => ({ ...prev, picture: base64 }));
    }
  };

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to validate product details
  const validateProduct = () => {
    const { quantity, description, price, available, name, picture } = product;
    if (!name) return "Product name is required.";
    if (!quantity || isNaN(quantity) || quantity <= 0)
      return "Quantity must be a positive number.";
    if (!price || isNaN(price) || price <= 0)
      return "Price must be a positive number.";
    if (description.length > 5000)
      return "Description must be less than 5000 characters.";
    if (available && (isNaN(available) || available < 0))
      return "Available quantity must be a non-negative number.";
    if (!picture) return "Product picture is required.";
    return "";
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateProduct();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:3080/insertProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || "Failed to add product. Please try again."
        );
      }

      const data = await response.json();
      setSuccessMessage("Product added successfully!");
      console.log("Product added:", data);

      // Reset product fields after successful submission
      setProduct({
        quantity: "",
        description: "",
        price: "",
        available: "",
        name: "",
        picture: "",
        seller_id: userId,
      });
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Product
        </h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Available Quantity
            </label>
            <input
              type="number"
              name="available"
              value={product.available}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              maxLength="5000"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Product Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
