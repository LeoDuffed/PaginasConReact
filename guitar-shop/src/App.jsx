/* eslint-disable no-unused-vars */
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { db } from "./data/db"
import { useState } from "react"

function App() {

  /* Documentacion useState:
  El hook useState en React JSX permite a los componentes 
  funcionales gestionar su estado interno, similar a como lo 
  hacen los componentes de clase. Devuelve un array que contiene 
  el valor actual del estado y una función para actualizarlo, 
  facilitando la gestión de datos que cambian durante el ciclo de 
  vida de un componente. 
  */
  const [data, setData] = useState(db) 
  // data = estado actual
  // setData = es un setter
  const [cart, setCart] = useState([])

  function addToCart(item){ // Funcion que mandamos como propt
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

  function removeFromCart(id){
    /* Documentacion .filter
    es un método iterativo que permite crear 
    una nueva matriz a partir de una matriz 
    existente, seleccionando únicamente los 
    elementos que cumplen una condición específica 
    definida por una función de callback. 
    */
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // Mantiene todos lo que tengas un id diferente
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < 5) {
        return {
          ...item, // "..." -> crear una copia superficial del array
          quantity: item.quantity + 1
        }
      }
      return item // Para que no se pierdan los otros items
    })
    setCart(updatedCart) // Returneamos el nuevo carrito
  }

  function decreaseQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity > 0) {
        return {
          ...item, // "..." -> crear una copia superficial del array
          quantity : item.quantity - 1
        }
      }
      return item // Para que no se pierdan los otros items
    })
    setCart(updateCart) // Returneamos el nuevo carrito
  }

  return (  
    <>  

    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity = {increaseQuantity}
      decreaseQuantity = {decreaseQuantity}
    />

    <main className="container-xl mt-5">

        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map ((guitar) => (
            <Guitar 
            // Todos los propts que le estamos mandando
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
