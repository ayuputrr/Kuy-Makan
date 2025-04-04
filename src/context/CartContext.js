import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext();

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingIndex !== -1) {
        const updated = [...state];
        updated[existingIndex].quantity += action.payload.quantity;
        return updated;
      } else {
        return [...state, { ...action.payload }];
      }

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );

    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const increaseQuantity = id => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = id => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
