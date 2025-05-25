/* eslint-disable no-unused-vars */

import Guitar from "./Guitar";
import { useMemo } from "react";

//import React from "react"
export default function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}){
    
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
    const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0) // Es un state derivado


    return(
        /* Otra manera en vez de return():
        inicio: <React.Fragment>
        final: </React.Fragment>
                o 
        inicio: <>
        final: </>
        */
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                
                                {isEmpty ? ( // Es como un if y llamamos al stateDerivado 

                                    <p className="text-center">El carrito esta vacio</p>
                                
                                ) : (

                                    <> 
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {cart.map(guitar => ( 
                                                    // Estamos iterando sobre cart con map//
                                                    /* Documentacion .map()
                                                    In React, the .map() method is used to iterate over 
                                                    an array and transform each element into something else, 
                                                    often JSX elements, which are then rendered in the UI. 
                                                    It's a fundamental tool for dynamically rendering lists of data.
                                                    */

                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img className="img-fluid" 
                                                            src= {`/img/${guitar.image}.jpg`}
                                                            alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                                ${guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)} // Call back
                                                            >
                                                                -
                                                            </button>
                                                                {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)} // Call back
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(guitar.id)} // Call back
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    
                                                ))}
                                            </tbody>
                                        </table>

                                    <p className="text-end">Total pagar: 
                                        <span className="fw-bold">${cartTotal()}</span>
                                    </p>

                                </>
                                // Fin del "if"
                                )} 
                                
                                <button 
                                className="btn btn-dark w-100 mt-3 p-2" 
                                onClick={clearCart}
                                >
                                    Vaciar Carrito
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

