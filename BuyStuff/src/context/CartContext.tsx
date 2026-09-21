import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../types/Product";
import { CartItem } from "../types/CartItem";

/*
cart data is stored within the app because the Fake Store API does not actually save data from POST and UPDATE calls.
*/

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.product, quantity: action.quantity },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.productId),
      };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product: Product, quantity: number) =>
    dispatch({ type: "ADD_ITEM", product, quantity });

  const removeItem = (productId: number) =>
    dispatch({ type: "REMOVE_ITEM", productId });

  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
