/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ChangeEvent, type Dispatch, type FormEvent, useEffect } from "react"
import { v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivitySatate } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivitySatate 
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1, 
    name:'',
    calories: 0
}

export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        
        const isNumbewField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumbewField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select   
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
                >

                    {categories.map(categories => (
                        <option
                            key={categories.id}
                            value={categories.id}
                        >
                            {categories.name}
                        </option>
                    ))}

            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name">Actividad:</label>
            <input 
                id="name"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida: Ensalada, Huevo, Ejercicio: Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
            />
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias:</label>
            <input 
                id="calories"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. 530, 300, 100"
                value={activity.calories === 0 ? '' : activity.calories}
                onChange={handleChange}
            />
        </div>
        
        <input
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />

    </form>
  )
}
