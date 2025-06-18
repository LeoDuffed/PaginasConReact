/* eslint-disable no-unused-vars */

import { useState, useEffect, useMemo } from "react" // Hook's que se usaron
import { db } from "../data/db" // Mini base de datos de las guitarras
import type { Guitar, CartItem } from '../types/index'


export const useCart = () => {

    // -------------------------------------------------------

        // Custom Hook 
        /* Que es un Hook: 
        Un hook es una función especial de React que te 
        permite usar características de React (como el 
        estado o el ciclo de vida) dentro de componentes funcionales.
        */

    // -------------------------------------------------------

        // Hook's para App.jsx

        /* Que hace localStorage:
        localStorage es parte de la Web Storage API, 
        una API nativa del navegador (no específica de React), 
        que permite guardar datos clave-valor en el navegador de 
        forma persistente (incluso si el usuario cierra la página).
        
        // Que hace .getItem:
        El método getItem() recupera el valor asociado a una clave 
        en el almacenamiento local del navegador (localStorage).
        
        //Documentacion .parse
        Parsing in React refers to the process of 
        converting data from one format (e.g., JSON, XML, HTML) 
        into a JavaScript object that can be used within React components.
        */
        const initialCart = () : CartItem[] => { // Inicializar el carro
            const localStorageCart = localStorage.getItem('cart')
            return localStorageCart ? JSON.parse(localStorageCart) : []
            // si tiene algo lo carga, si no inicia vacio
        }
        
        /* Documentacion useState:
        El hook useState en React JSX permite a los componentes 
        funcionales gestionar su estado interno, similar a como lo 
        hacen los componentes de clase. Devuelve un array que contiene 
        el valor actual del estado y una función para actualizarlo, 
        facilitando la gestión de datos que cambian durante el ciclo de 
        vida de un componente. 
        */
        const [data] = useState(db) 
        const [cart, setCart] = useState(initialCart)
        // cart = estado actual
        // setCart = es un setter
        
        /* useEffect Documentacion: 
        The useEffect Hook in React allows functional components 
        to perform side effects, such as data fetching, 
        DOM manipulation, or setting up subscriptions, 
        after rendering. It serves as a replacement for 
        lifecycle methods found in class components, 
        like componentDidMount, componentDidUpdate, and 
        componentWillUnmount.
        */
        useEffect(() => { // call back de useEffect para cada que cambia el carrito
            localStorage.setItem('cart', JSON.stringify(cart)) // Linea para guardar en local storage
        }, [cart])
        
        function addToCart(item : Guitar){ // Funcion que mandamos como propt
            const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
            if(itemExist >= 0){ // Si ya exsite va sumando a la cantidad
                if(cart[itemExist].quiantity >= 5) return 
                const updateCart = [...cart]
                updateCart[itemExist].quiantity++
                setCart(updateCart)
            } else{ // Si no existe la cantidad es 1.
                const newItem : CartItem = {...item, quiantity : 1} // Convertimos a otro tipo de dato
                setCart([...cart, newItem])
            }
        }
        
        function removeFromCart(id : Guitar['id']){
            /* Documentacion .filter
            es un método iterativo que permite crear 
            una nueva matriz a partir de una matriz 
            existente, seleccionando únicamente los 
            elementos que cumplen una condición específica 
            definida por una función de callback. 
            */
            setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // Mantiene todos lo que tengas un id diferente
        }
        
        function increaseQuantity(id : Guitar['id']){
            const updatedCart = cart.map(item => { // Iterando con .map()
            if(item.id === id && item.quiantity < 5) { // No puede ser mayor que 5
                return {
                ...item, // "..." -> crear una copia superficial del array
                quantity: item.quiantity + 1
                }
            }
            return item // Para que no se pierdan los otros items
            })
            setCart(updatedCart) // Returneamos el nuevo carrito
        }
        
        function decreaseQuantity(id : Guitar['id']){
            const updateCart = cart.map(item => { // Iterando con .map()
            if(item.id === id && item.quiantity > 1) { // No puede ser menor que 1
                return {
                ...item, // "..." -> crear una copia superficial del array
                quantity : item.quiantity - 1
                }
            }
            return item // Para que no se pierdan los otros items
            })
            setCart(updateCart) // Returneamos el nuevo carrito
        }
        
        function clearCart(){ // Funcion para limpiar el carrito
            setCart([]) // Limpiamos un arreglo
        }

        // Hook's para Header.jsx 
        // Instanceados desde App.jsx

        /* Documentacion useMemo:
        useMemo is a React Hook that optimizes performance 
        by memoizing the result of a function call. It's particularly 
        useful for expensive computations or when rendering large lists, 
        preventing unnecessary re-renders. It receives a function and an array 
        of dependencies as arguments. The function is executed only when the 
        dependencies change, otherwise, useMemo returns the cached value. 
        */
        const isEmpty = useMemo( () => cart.length === 0 , [cart] )

        /* Documentacion State Derivado
        En el contexto de React y JSX, "state derivado" 
        (o "state" calculado) se refiere a un estado que se 
        obtiene de otros estados o propiedades del componente. 
        En lugar de almacenar directamente el valor que se va a 
        mostrar, se calcula basado en otros valores.

        // Documentacion .reduce()
        El método .reduce() en JavaScript 
        es una función de alto nivel que permite reducir un array 
        a un valor único. Esto se hace iterando sobre los elementos 
        del array y aplicando una función de devolución de llamada que 
        combina los elementos con un acumulador
        */
        const cartTotal = () => cart.reduce((total, item) => total + (item.quiantity * item.price), 0) // Es un state derivado

        return {
            data, 
            cart,
            addToCart, 
            removeFromCart, 
            decreaseQuantity, 
            increaseQuantity, 
            clearCart, 
            isEmpty, 
            cartTotal
        }

}