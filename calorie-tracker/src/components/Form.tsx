/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ChangeEvent, type Dispatch, type FormEvent, useEffect } from "react"
import { v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivitySatate } from "../reducers/activity-reducer"

/* Documentacion funciones usadas en este codigo: 

    - State: El state (estado) es un objeto o valor 
    que representa información dinámica en un componente 
    de React. Puede cambiar a lo largo del tiempo según 
    interacciones del usuario o datos externos.

    - Dispatch: 
    dispatch es una función que se usa para enviar 
    acciones a un reducer. Estas acciones describen 
    cómo debe cambiar el estado.
    Ejemplo de uso de Reducer: 
    # dispatch({ type: 'save-activity', payload: { newActivity } });
        - dispatch invoca al reducer con el estado actual y la acción.
        - El reducer devuelve el nuevo estado.

    - useState: 
    useState es un hook de React que permite declarar 
    variables de estado dentro de un componente funcional.
    Sintaxis:
    # const [valor, setValor] = useState(valorInicial);

    - .trim(): 
    .trim() es un método de los strings en JavaScript 
    que elimina los espacios en blanco al inicio y al 
    final de una cadena.

    - Que es un prop:
    Un prop (abreviación de property) es un dato que se le 
    pasa a un componente desde su componente padre. Es 
    inmutable dentro del componente hijo.
    
*/

type FormProps = {
    // `dispatch`: función para enviar acciones al reducer global
    dispatch: Dispatch<ActivityActions>
    // `state`: el estado actual que contiene la lista de actividades y el ID activo
    state: ActivitySatate 
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1, 
    name:'',
    calories: 0
}

export default function Form({dispatch, state} : FormProps) {
    
    // Hook de estado para manejar la actividad actual en el formulario
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        // Si hay un ID activo en el estado global, busca la actividad correspondiente
        if(state.activeId){
            const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            // Carga esa actividad en el estado local para editarla en el formulario
            setActivity(selectActivity)
        }
    }, [state.activeId])// Este efecto solo se ejecuta cuando cambia el ID activo

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        // Detecta si el campo que cambió es de tipo numérico para convertirlo
        const isNumbewField = ['category', 'calories'].includes(e.target.id)
        // Actualiza el estado local de la actividad con el nuevo valor
        setActivity({
            ...activity,
            [e.target.id]: isNumbewField ? +e.target.value : e.target.value
        })
    }

    // Verifica si la actividad tiene un nombre no vacío y calorías mayores a cero
    const isValidActivity = () => {
        const { name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    // Manejador del submit del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Envía la actividad actual al reducer global mediante dispatch
        dispatch({type: 'save-activity', payload: {newActivity: activity}})
        
        // Resetea el formulario con un nuevo ID para futuras actividades
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
