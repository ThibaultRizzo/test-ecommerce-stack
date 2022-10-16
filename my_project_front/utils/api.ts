import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Order, Product } from "../types/wooCommerce.types";
import {AxiosResponse} from 'axios';
// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: "http://localhost:8000",
  consumerKey: process.env.WOOCOMMERCE_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_SECRET!,
  version: "wc/v3",
});

// fetch all products from WooCommerce //
export async function fetchWooCommerceProducts() {
  try {
    const response = await (api.get("products") as Promise<AxiosResponse<Product[]>>);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createWooCommerceOrder(data: Order) {
  try {
    const response = await (api.post("orders", data) as Promise<AxiosResponse<Product[]>>);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}