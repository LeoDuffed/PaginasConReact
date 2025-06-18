/* eslint-disable */

import { useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers" 

type OrderTotalsProps={
    order: OrderItem[], 
    tip: number, 
    placeOrder: () => void 
}

export default function OrderTotals({order, tip, placeOrder}: OrderTotalsProps) {

    // Para calcular el subtotal a pagar
    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
    const finalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
                <p>Subtotal a pagar: {''}
                    <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
                </p>
                <p>Propinas: {''}
                    <span className="font-bold">{formatCurrency(tipAmount)}</span>
                </p>
                <p>Total a Pagar:  {''}
                    <span className="font-bold">{formatCurrency(finalAmount)}</span>
                </p>
            </div>

            <button 
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={finalAmount === 0}
                onClick={placeOrder}
            >
                Guardar Oreden
            </button>
        </>
    )
}
