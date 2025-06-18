import type { Dispatch } from "react"
import type { MenuItem } from "../types"
import type { OrderActions } from "../reducers/order-reducer"

type MenuItemProps = {
    item: MenuItem
    dispatch: Dispatch<OrderActions>
}

export default function MenuItems({item, dispatch} : MenuItemProps) {
  return (
    <button
    className=" border-2 border-purple-700 hover:bg-purple-300 w-full p-3 flex justify-between"
    onClick={() => dispatch({type: 'add-item', payload: {item}})}
    >
      <p>{item.name}</p>
      <p className="font-black">${item.price}</p>
    
    </button>
  )
}
