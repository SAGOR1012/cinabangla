"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { MotionConfig } from "framer-motion";

const StoreContext = createContext(null);
const KEY = "cbpt-store-v1";

function reducer(state, a) {
  switch (a.type) {
    case "hydrate": return a.state;
    case "add": {
      const qty = a.qty || 1;
      const exists = state.cart.find((i) => i.id === a.id);
      const cart = exists
        ? state.cart.map((i) => (i.id === a.id ? { ...i, qty: i.qty + qty } : i))
        : [...state.cart, { id: a.id, qty }];
      return { ...state, cart };
    }
    case "remove": return { ...state, cart: state.cart.filter((i) => i.id !== a.id) };
    case "setQty": return { ...state, cart: state.cart.map((i) => (i.id === a.id ? { ...i, qty: Math.max(1, a.qty) } : i)) };
    case "clear": return { ...state, cart: [] };
    case "wish": return { ...state, wishlist: state.wishlist.includes(a.id) ? state.wishlist.filter((x) => x !== a.id) : [...state.wishlist, a.id] };
    default: return state;
  }
}

export function StoreProvider({ products, children }) {
  const [state, dispatch] = useReducer(reducer, { cart: [], wishlist: [] });
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) dispatch({ type: "hydrate", state: s }); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }, [state, ready]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); }, [toast]);

  const value = useMemo(() => {
    const items = state.cart
      .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
      .filter((i) => i.product);
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.product.price, 0),
      wishlist: state.wishlist,
      ready,
      toast,
      addToCart: (id, qty = 1) => { dispatch({ type: "add", id, qty }); setToast("Added to cart"); },
      removeFromCart: (id) => dispatch({ type: "remove", id }),
      setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
      clearCart: () => dispatch({ type: "clear" }),
      toggleWish: (id) => dispatch({ type: "wish", id }),
    };
  }, [state, products, ready, toast]);

  return (
    <StoreContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
