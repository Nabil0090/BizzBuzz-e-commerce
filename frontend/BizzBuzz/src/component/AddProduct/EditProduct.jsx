import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import placeholderImg from "./placeholder.jpg";

export default function EditProduct() {
  const userId = localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products by seller ID
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3080/products/seller/${userId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userId]);
  
  console.log(products);

  const handleEdit = (productId) => {
    navigate(`/edit_product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Products</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.PRODUCT_ID}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.PICTURE ? `data:image/jpeg;base64,${product.PICTURE}` : placeholderImg}
              alt={product.NAME}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{product.NAME}</h2>
            <p className="text-gray-600 mt-2">{product.DESCRIPTION}</p>
            <p className="text-gray-800 mt-2 font-bold">${product.PRICE}</p>
            <p className="text-gray-600 mt-2">Quantity: {product.QUANTITY}</p>
            <p className="text-gray-600 mt-2">Available: {product.AVAILABLE}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleEdit(product.PRODUCT_ID)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
