import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/Order";
import { OrdersState } from "../types";

const initialState: OrdersState = {
  orders: []
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch(type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        payload.items, payload.amount,
        new Date()
      );
        return {
          ...state,
          orders: state.orders.concat(newOrder)
        };
    default:
      return state;
  }
};