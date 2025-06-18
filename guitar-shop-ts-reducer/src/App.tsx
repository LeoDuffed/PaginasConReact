/* eslint-disable @typescript-eslint/no-unused-vars */

import { useReducer } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { useCart } from "./hooks/useCart"
import { cartReducer, initialState } from "./reducers/cart-reducer"

function App() {

  // Llamando a todo lo que hay en el custom Hook
  const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()

  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (  
    <>  

    <Header
      // Todos los propt's que le estamos mandoando a "Header"
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity = {increaseQuantity}
      decreaseQuantity = {decreaseQuantity}
      clearCart={clearCart}
      isEmpty = {isEmpty}
      cartTotal = {cartTotal}
    />

    <main className="container-xl mt-5">

        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map ((guitar) => (
            <Guitar 
              // Todos los propt's que le estamos mandando a "Guitar"
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            /> 
          ))}

        </div>

    </main>

    <Footer/> 
    </>
  )
}

export default App
