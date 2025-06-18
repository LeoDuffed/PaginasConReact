/* eslint-disable @typescript-eslint/no-unused-vars */
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

        const [cart, setCart] = useState(initialCart)
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
        
        
        function clearCart(){ // Funcion para limpiar el carrito
            setCart([]) // Limpiamos un arreglo
        }

        // Hook's para Header.jsx 
        // Instanceados desde App.jsx

        return { 
            cart, 
            clearCart
        }

}