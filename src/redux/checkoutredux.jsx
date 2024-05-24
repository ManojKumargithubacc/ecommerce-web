import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const initialCheckoutState = {
  hasCheckedOut: false,
};

const SET_CHECKOUT = "SET_CHECKOUT";

export const setCheckout = (hasCheckedOut) => ({
  type: SET_CHECKOUT,
  payload: hasCheckedOut,
});

const checkoutReducer = (state = initialCheckoutState, action) => {
  switch (action.type) {
    case SET_CHECKOUT:
      return {
        ...state,
        hasCheckedOut: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  checkout: checkoutReducer,
});

const store = createStore(rootReducer);

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
export default store;
