import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem
}

export default function MenuItems({item} : MenuItemProps) {
  return (
    <button
    className=" border-2 border-purple-700 hover:bg-purple-300 w-full p-3 flex justify-between "
    >
      <p>{item.name}</p>
      <p className="font-black">${item.price}</p>
    
    </button>
  )
}
