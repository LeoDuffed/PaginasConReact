import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem
    addItem: (item : MenuItem) => void
}

export default function MenuItems({item, addItem} : MenuItemProps) {
  return (
    <button
    className=" border-2 border-purple-700 hover:bg-purple-300 w-full p-3 flex justify-between"
    onClick={() => addItem(item)}
    >
      <p>{item.name}</p>
      <p className="font-black">${item.price}</p>
    
    </button>
  )
}
