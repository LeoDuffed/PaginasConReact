/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMemo, useState, type ChangeEvent } from "react"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <=0
    }, [budget])

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
                    value={budget === 0 ? '' : budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-rose-400 rounded-lg hover:bg-rose-500 cursor-pointer w-full 
                p-2 text-black font-black uppercase disabled:opacity-25"
                disabled={isValid}
            
            />
        </form>
    )
}
