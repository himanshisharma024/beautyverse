import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./ProtectedAction";

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
    totalSavings,
  } = useCart();

  const navigate = useNavigate();

  return (
    <>
      {/* Dark overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">My Bag 🛍️</h2>
            <p className="text-xs text-gray-400">{totalItems} items</p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <span className="text-6xl">🛍️</span>
              <h3 className="font-semibold text-gray-700">Your bag is empty</h3>
              <p className="text-gray-400 text-sm">Add products to see them here</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primaryDark transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">

                  {/* Product Image — supports both image and emoji */}
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-3xl">{item.emoji || "🧴"}</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase">{item.brand}</p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-bold text-gray-900 text-sm">₹{item.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary font-bold text-lg transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary font-bold text-lg transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">

            {/* Free delivery progress */}
            {totalPrice < 499 && (
              <div className="bg-pink-50 rounded-xl p-3">
                <p className="text-xs text-gray-600">
                  Add{" "}
                  <span className="font-bold text-primary">
                    ₹{499 - totalPrice}
                  </span>{" "}
                  more for FREE delivery 🚚
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min((totalPrice / 499) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {totalPrice >= 499 && (
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs text-green-600 font-medium">
                  🎉 You got FREE delivery!
                </p>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice + totalSavings}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>− ₹{totalSavings}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span className={totalPrice >= 499 ? "text-green-600" : ""}>
                  {totalPrice >= 499 ? "FREE" : "₹49"}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{totalPrice >= 499 ? totalPrice : totalPrice + 49}</span>
              </div>
            </div>

            {/* Savings badge */}
            {totalSavings > 0 && (
              <div className="bg-green-50 text-green-700 text-xs text-center py-1.5 rounded-lg font-medium">
                🎉 You are saving ₹{totalSavings} on this order!
              </div>
            )}

            {/* Checkout Button — with login check */}
            <button
              onClick={() => {
                if (!isLoggedIn()) {
                  setIsCartOpen(false);
                  navigate("/login");
                  return;
                }
                setIsCartOpen(false);
                navigate("/checkout");
              }}
              className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primaryDark transition"
            >
              Proceed to Checkout →
            </button>

          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;