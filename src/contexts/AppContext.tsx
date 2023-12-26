import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

// =================================================================================
type InitialState = { cart: any[], products: any[], detailProducts: any[], allProduct: any[] };
export type ProductsItem = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
}
export type CartItem = {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};

type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: any; types: "CHANGE_PRODUCTS_AMOUNT", detail:"DETAIL_PRODUCTS", getAllProduct: "GET_ALL_PRODUCT"};
type ActionType = CartActionType;

// ================================================================================
const INITIAL_CART = []

 

const INITIAL_STATE = { cart: INITIAL_CART, products: [], detailProducts:[], allProduct: [] };

interface ContextProps {
  state: InitialState;
  dispatch: (args: any) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type || action.types || action.detail || action.getAllProduct) {
 
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      const cartItem =  action.payload
      // let cartItem = action.payload
      let exist = cartList.find((item) => item.name === cartItem?.name);
      
      if (cartItem?.qty < 1) {
        const filteredCart = cartList.filter((item) => item.name !== cartItem.name);
        localStorage.setItem("productCart", JSON.stringify(filteredCart))
        return { ...state, cart: filteredCart }; 
      }
      if(cartItem == "resetCart"){
        return {...state, cart : []}
      }
      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.name === cartItem?.name ? { ...item, qty: cartItem?.qty } : item
        );
        localStorage.setItem("productCart", JSON.stringify(newCart))
        return { ...state, cart: newCart };
      }
      localStorage.setItem("productCart", JSON.stringify([...state.cart, cartItem]))
      return { ...state, cart: [...cartList, cartItem]};

      
    default: {
      localStorage.setItem("productCart", JSON.stringify(state.cart))
      return state;
    }
    case "CHANGE_PRODUCTS_AMOUNT": 
      let productList = state.products; 
      let productItem = action.payload;
      
      if(productItem){
        return {...state, products : [...productList ],...productItem }
      };
      return {...state, products : [...productList, productItem]}
      
    case "DETAIL_PRODUCTS": 
      let newDetail = state.detailProducts
      let detailPr = action.payload;
      if(detailPr) {
        return {...state, detailProducts : [detailPr]}
      }
      return
      case "GET_ALL_PRODUCT": 
      let newAllProduct = state.allProduct
      let getData = action.payload
      if(getData) {
        return {...state, allProduct : [...getData]}
      }
    
  }
};

// =======================================================
type AppProviderProps = { children: ReactNode };
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
  return (
    <AppContext.Provider  value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
