import {
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_ORDERS_REQUEST,
  ORDER_LIST_MY_ORDERS_SUCCESS,
  ORDER_LIST_MY_ORDERS_FAIL,
  ORDER_LIST_MY_ORDERS_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return { loading: true };
    case USER_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case USER_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, ordersItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAIL_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const getMyOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_ORDERS_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_ORDERS_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case ORDER_LIST_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_MY_ORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
