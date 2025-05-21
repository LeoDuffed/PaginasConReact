/* eslint-disable no-unused-vars */
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { db } from "./data/db"
import { useState } from "react"

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item){
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExist >= 0){ // Si ya exsite va sumando a la cantidad
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    } else{ // Si no existe la cantidad es 1.
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  return (  
    <>  

    <Header
      cart={cart}
    />

    <main className="container-xl mt-5">

        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map ((guitar) => (
            <Guitar // Todo lo que le estamos mandando al guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
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
