import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImg from "./placeholder.jpg";

export default function EditProductForm() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    NAME: "",
    DESCRIPTION: "",
    PRICE: "",
    PICTURE: "",
    QUANTITY: "",
    AVAILABLE: "",
  });
  const [file, setFile] = useState(null); // State to store the selected file
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3080/getproducts/${id}`
        );
        setProduct(response.data);
        setFormData({
          NAME: response.data.NAME,
          DESCRIPTION: response.data.DESCRIPTION,
          PRICE: response.data.PRICE,
          PICTURE: response.data.PICTURE,
          QUANTITY: response.data.QUANTITY,
          AVAILABLE: response.data.AVAILABLE,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setErrorMessage("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, PICTURE: reader.result }));
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3080/updateProducts/${id}`, formData);
      setSuccessMessage("Product updated successfully!");
      setErrorMessage(""); // Clear any previous error messages
      navigate(`/edit_product`); // Redirect to the updated product page or a success page
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("Failed to update product. Please try again.");
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <div className="bg-white shadow-md rounded-lg p-4 max-w-lg mx-auto">
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-4 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-200 text-green-700 p-4 mb-4 rounded">
            {successMessage}
          </div>
        )}
        <img
          src={
            formData.PICTURE
              ? formData.PICTURE
              : product.PICTURE
              ? `data:image/jpeg;base64,${product.PICTURE}`
              : placeholderImg
          }
          alt={formData.NAME || product.NAME}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="NAME"
              value={formData.NAME}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="DESCRIPTION"
              value={formData.DESCRIPTION}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="PRICE"
              value={formData.PRICE}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="QUANTITY"
              value={formData.QUANTITY}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Available</label>
            <input
              type="number"
              name="AVAILABLE"
              value={formData.AVAILABLE}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
