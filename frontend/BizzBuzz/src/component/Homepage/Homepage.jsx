import React, { useEffect, useState } from "react";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:3080/products") // Adjust this to your actual API endpoint
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to handle adding product to cart
  const addToCart = (productId) => {
    // Get the existing cart from localStorage (or initialize an empty array)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.productId === productId);

    if (existingProduct) {
      // If product is already in the cart, increment its quantity
      existingProduct.quantity += 1;
    } else {
      // If not, add the product with quantity 1
      cart.push({ productId, quantity: 1 });
    }

    // Update the localStorage with the new cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Display success message
    setSuccessMessage("Product added to cart successfully!");

    // Clear success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
        Our Products
      </h1>

      {/* Display success message */}
      {successMessage && (
        <div className="text-green-600 font-bold text-center mb-4">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.PRODUCT_ID}
            className="bg-slate-800 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg p-6"
          >
            <div className="mb-4">
              {/* Display product image if available */}
              {product.PICTURE ? (
                <img
                  src={product.PICTURE}
                  alt={product.NAME}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-slate-600 rounded flex items-center justify-center text-slate-300">
                  No Image Available
                </div>
              )}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{product.NAME}</h2>
            <p className="text-slate-300 mb-4">{product.DESCRIPTION}</p>
            <div className="text-white font-bold text-xl mb-2">
              ${product.PRICE}
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product.PRODUCT_ID)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
