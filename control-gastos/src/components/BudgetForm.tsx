/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react"

export default function BudgetForm() {


    return (
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-black font-bold text-center">
                    Definir Presupueto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-fill bg-white border border-gray-200 p-2"
                    placeholder="Definie tu presupuesto"
                    name="budget"
                />
            </div>

            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-rose-400 rounded-lg hover:bg-rose-500 cursor-pointer w-full p-2 text-black font-black uppercase"
            
            />
        </form>
    )
}
