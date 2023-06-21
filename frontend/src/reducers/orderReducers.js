import {
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
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
