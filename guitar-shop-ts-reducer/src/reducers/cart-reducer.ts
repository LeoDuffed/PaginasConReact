/* eslint-disable @typescript-eslint/no-unused-vars */

import type { CartItem } from "../types/index";
import type { Guitar } from "../types";
import { db } from "../data/db"

export type CartActrions = 
    {type: 'add-to-cart', payload: {item: Guitar}} |
    {type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    {type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    {type: 'increase-quantity', payload: {id: Guitar['id']}} |
    {type: 'clear-cart'} 

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

export const initialState: CartState = {
    data: db,
    cart: []
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
        state : CartState = initialState,
        action: CartActrions
    ) => {
    
    if(action.type === 'add-to-cart'){
        const itemExist = state.cart.find((guitar) => guitar.id === action.payload.item.id)

        let updatedCart : CartItem[] = []

        if(itemExist){ // Si ya exsite va sumando a la cantidad
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return{...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                } else{
                    return item
                }
            })
        } else{ // Si no existe la cantidad es 1.
            const newItem : CartItem = {...action.payload.item, quantity : 1} // Convertimos a otro tipo de dato
            updatedCart = [...state.cart, newItem]
        }
        return{
            ...state, 
            cart: updatedCart
        }
    }

    if(action.type === 'remove-from-cart'){
        /* Documentacion .filter
            es un método iterativo que permite crear 
            una nueva matriz a partir de una matriz 
            existente, seleccionando únicamente los 
            elementos que cumplen una condición específica 
            definida por una función de callback. 
        */
        const updateCart = state.cart.filter(iten => iten.id !== action.payload.id)
        return{
            ...state,
            cart: updateCart
        }
    }

    if(action.type === 'decrease-quantity'){
        return{
            ...state
        }
    }

    if(action.type === 'increase-quantity'){
        return{
            ...state
        }
    }

    if(action.type === 'clear-cart'){
        return{
            ...state
        }
    }

    return state
}