import {
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
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
