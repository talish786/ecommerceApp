import axios from "axios";
import {
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders/create`, order, config);
    dispatch({
      type: USER_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
