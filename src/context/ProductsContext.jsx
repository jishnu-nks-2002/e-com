import React, { createContext, useReducer, useContext, useEffect } from "react";
import {
  fetchAllProducts
} from "../api/productsApi";

const ProductsStateContext = createContext();
const ProductsDispatchContext = createContext();

const initialState = {
  products: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch(action.type){
    case "FETCH_START":
      return {...state, loading: true, error: null};
    case "FETCH_SUCCESS":
      return {...state, loading: false, products: action.payload};
    case "FETCH_ERROR":
      return {...state, loading: false, error: action.payload};
    case "ADD_PRODUCT":
      return {...state, products: [action.payload, ...state.products]};
    case "UPDATE_PRODUCT":
      return {...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p)};
    case "DELETE_PRODUCT":
      return {...state, products: state.products.filter(p => p.id !== action.payload)};
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
}

export function ProductsProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;
    async function load(){
      dispatch({type: "FETCH_START"});
      try{
        const data = await fetchAllProducts();
        // Fake Store returns id numbers; for newly created client side we will generate new IDs (e.g., Date.now()).
        if(mounted) dispatch({type: "FETCH_SUCCESS", payload: data});
      }catch(err){
        dispatch({type: "FETCH_ERROR", payload: err.message || "Failed to fetch products"});
      }
    }
    load();
    return () => mounted = false;
  }, []);

  return (
    <ProductsStateContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsStateContext.Provider>
  );
}

// hooks
export function useProductsState(){
  const ctx = useContext(ProductsStateContext);
  if (!ctx) throw new Error("useProductsState must be used within ProductsProvider");
  return ctx;
}

export function useProductsDispatch(){
  const ctx = useContext(ProductsDispatchContext);
  if (!ctx) throw new Error("useProductsDispatch must be used within ProductsProvider");
  return ctx;
}
