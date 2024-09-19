import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [checkoutStatus, setCheckoutStatus] = useState(null); // For displaying success or error
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Fetch product details for items in the cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const fetchCartProducts = async () => {
      const fetchedProducts = await Promise.all(
        storedCart.map(async (item) => {
          const response = await fetch(
            `http://localhost:3080/getproducts/${item.productId}`
          );
          const data = await response.json();
          return { ...data, quantity: item.quantity }; // Include quantity from localStorage
        })
      );
      setCartProducts(fetchedProducts);

      calculateTotalCost(fetchedProducts);
    };

    if (storedCart.length > 0) {
      fetchCartProducts();
    }
  }, []);

  const calculateTotalCost = (cartProducts) => {
    const total = cartProducts.reduce(
      (sum, product) => sum + product.PRICE * product.quantity,
      0
    );
    setTotalCost(total);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      const product = cartProducts.find(
        (prod) => prod.PRODUCT_ID === productId
      );
      if (item.productId === productId && item.quantity < product.AVAILABLE) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedProducts = cartProducts.map((product) =>
      product.PRODUCT_ID === productId && product.quantity < product.AVAILABLE
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCartProducts(updatedProducts);

    calculateTotalCost(updatedProducts);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedProducts = cartProducts.map((product) =>
      product.PRODUCT_ID === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCartProducts(updatedProducts);

    calculateTotalCost(updatedProducts);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedProducts = cartProducts.filter(
      (product) => product.PRODUCT_ID !== productId
    );
    setCartProducts(updatedProducts);

    calculateTotalCost(updatedProducts);
  };

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3080/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: userId,
          products: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        // Success message
        setCheckoutStatus({ success: true, message: "Checkout successful!" });
        localStorage.removeItem("cart");
        setCart([]);
        setCartProducts([]);
        setTotalCost(0);
        navigate("/checkout"); // Redirect to a thank-you page after success
      } else {
        // Error message
        setCheckoutStatus({
          success: false,
          message: "Checkout failed. Try again.",
        });
      }
    } catch (error) {
      setCheckoutStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
        Your Cart
      </h1>

      {checkoutStatus && (
        <div
          className={`text-center p-4 mb-4 ${
            checkoutStatus.success ? "bg-green-500" : "bg-red-500"
          } text-white rounded-lg`}
        >
          {checkoutStatus.message}
        </div>
      )}

      {cartProducts.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {cartProducts.map((product) => (
            <div
              key={product.PRODUCT_ID}
              className="bg-white shadow-lg rounded-lg p-6 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{product.NAME}</h2>
                <p className="text-gray-600">Price: ${product.PRICE}</p>
                <p className="text-gray-500">Available: {product.AVAILABLE}</p>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => decreaseQuantity(product.PRODUCT_ID)}
                  className="bg-gray-300 text-black px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-200">
                  {product.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(product.PRODUCT_ID)}
                  className="bg-gray-300 text-black px-2 py-1 rounded-r"
                  disabled={product.quantity >= product.AVAILABLE}
                >
                  +
                </button>
              </div>

              <div>
                <p className="text-lg font-semibold">
                  Total: ${(product.PRICE * product.quantity).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(product.PRODUCT_ID)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-2xl font-semibold mt-8">
            Total Cost: ${totalCost.toFixed(2)}
          </div>

          <div className="text-right mt-8">
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
