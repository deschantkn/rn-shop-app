import Product from "../models/Product";
import CartItem from "../models/CartItem";
import Order from "../models/Order";

export type CartItemState = {
  readonly items: { [key: string]: CartItem };
  readonly totalAmount: number
};

export type ProductsState = {
  readonly availableProducts: Product[];
  readonly userProducts: Product[];
};

export type OrdersState = {
  readonly orders: Order[]
};

export type RootState = {
  products: ProductsState,
  cart: CartItemState,
  orders: OrdersState
};

