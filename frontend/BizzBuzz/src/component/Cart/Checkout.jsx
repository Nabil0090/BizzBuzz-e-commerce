import React from "react";

export default function Checkout() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          We appreciate your business.
        </p>
        <p className="text-md text-gray-500">
          A confirmation email has been sent to your inbox with the receipt of
          your order.
        </p>
      </div>
    </div>
  );
}
