/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {

    /* useMemo()        
        useMemo es un hook de React que memoriza el resultado de 
        una función para evitar volver a calcularla si sus 
        dependencias no han cambiado. Se usa para mejorar el 
        rendimiento de componentes cuando tienes operaciones 
        costosas o cálculos innecesarios que se ejecutan en 
        cada renderizado.
    */
    // Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const totalCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Quemadas"
                />
                <CalorieDisplay
                    calories={totalCalories}
                    text="Total"
                />
            </div>

        </>
    )
}
