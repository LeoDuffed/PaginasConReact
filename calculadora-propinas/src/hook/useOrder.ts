/* eslint-disable */

import { useState } from "react";
import type { MenuItem, OrderItem } from "../types";

export default function useOrder(){

    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItem = (item : MenuItem) => {

        // Para que no se repitan los productos y suba solo la cantidad
        const itemExiste = order.find(orderItem => orderItem.id === item.id)
        if (itemExiste) {
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ? 
                {...orderItem, quantity : orderItem.quantity + 1} : orderItem)
            setOrder(updatedOrder)
        } else {
            const newItem = {...item, quantity : 1}
            setOrder([...order, newItem])
        }
    }

    // Funcino para poder elminar comida de la ordern 
    const removeitem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    return {
        order,
        tip, 
        setTip,
        addItem, 
        removeitem
    }
}