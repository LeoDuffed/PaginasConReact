/* eslint-disable @typescript-eslint/no-unused-vars */

import { useReducer, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { cartReducer, initialState } from "./reducers/cart-reducer"

function App() {

  // Llamando a todo lo que hay en el custom Hook
  const [state, dispatch] = useReducer(cartReducer, initialState)

 useEffect(() => { // call back de useEffect para cada que cambia el carrito
  localStorage.setItem('cart', JSON.stringify(state.cart)) // Linea para guardar en local storage
  }, [state.cart])

  return (  
    <>  

    <Header
      // Todos los propt's que le estamos mandoando a "Header"
      cart={state.cart}
      dispatch={dispatch}
    />

    <main className="container-xl mt-5">

        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {state.data.map ((guitar) => (
            <Guitar 
              // Todos los propt's que le estamos mandando a "Guitar"
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
            /> 
          ))}

        </div>

    </main>

    <Footer/> 
    </>
  )
}

export default App
