import request from "@/const/request"
import { OrderProperty } from "../types/order"

export const getOrderList = async () => {
  return request.post<OrderProperty[]>('order/getOrderList')
}

export const updateOrder = async (params: OrderProperty) => {
  return request.post('order/createOrder', { ...params })
}
