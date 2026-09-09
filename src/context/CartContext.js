"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

function getCartItemId(product, selectedSize, selectedColor) {
  return `${product.id}-${selectedSize ?? "none"}-${selectedColor ?? "none"}`;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const cartItemId = getCartItemId(
        action.product,
        action.selectedSize,
        action.selectedColor,
      );

      const existing = state.find((i) => i.cartItemId === cartItemId);

      if (existing) {
        return state.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + action.quantity }
            : i,
        );
      }

      return [
        ...state,
        {
          ...action.product,
          cartItemId,
          selectedSize: action.selectedSize ?? null,
          selectedColor: action.selectedColor ?? null,
          quantity: action.quantity,
        },
      ];
    }

    case "REMOVE_ITEM":
      return state.filter((i) => i.cartItemId !== action.cartItemId);

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((i) => i.cartItemId !== action.cartItemId);
      }
      return state.map((i) =>
        i.cartItemId === action.cartItemId
          ? { ...i, quantity: action.quantity }
          : i,
      );

    case "INCREMENT": {
      return state.map((i) =>
        i.cartItemId === action.cartItemId
          ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
          : i,
      );
    }

    case "DECREMENT": {
      return state
        .map((i) =>
          i.cartItemId === action.cartItemId
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        )
        .filter((i) => i.quantity > 0);
    }

    case "CLEAR":
      return [];

    case "LOAD":
      return action.items;

    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [deliveryMethod, setDeliveryMethod] = useState("regular");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        dispatch({ type: "LOAD", items: JSON.parse(saved) });
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function addToCart(
    product,
    quantity = 1,
    selectedSize = null,
    selectedColor = null,
  ) {
    dispatch({
      type: "ADD_ITEM",
      product,
      quantity,
      selectedSize,
      selectedColor,
    });
  }

  function removeFromCart(cartItemId) {
    dispatch({ type: "REMOVE_ITEM", cartItemId });
  }

  function updateQuantity(cartItemId, quantity) {
    dispatch({ type: "UPDATE_QUANTITY", cartItemId, quantity });
  }

  function incrementItem(cartItemId) {
    dispatch({ type: "INCREMENT", cartItemId });
  }

  function decrementItem(cartItemId) {
    dispatch({ type: "DECREMENT", cartItemId });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementItem,
        decrementItem,
        clearCart,
        totalItems,
        totalPrice,
        paymentMethod,
        setPaymentMethod,
        deliveryMethod,
        setDeliveryMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
