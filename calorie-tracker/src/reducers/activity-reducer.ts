/* eslint-disable @typescript-eslint/no-unused-vars */

import type {Activity} from "../types"

/* Cuando Combiene usar useReducer
    Usa useReducer cuando:
    - Tienes múltiples propiedades de estado que se actualizan juntas.
    - La actualización depende de acciones y requiere lógica compleja.
    - Estás implementando un patrón tipo Redux.
    - Quieres una estructura más predecible en apps medianas a grandes.
*/

/* Que es cada parte: 

    { ... }	 ------ Un objeto literal que representa una acción

    type: 'save-activity' ------- Una propiedad que indica el tipo de acción. 
                                  Se usa como identificador en el reducer. 
                                  Literalmente dice: "esto es una acción de tipo 
                                  save-activity".

    payload: { ... } ------ Objeto con los datos adicionales necesarios para 
                            ejecutar la acción.

    newActivity : Activity -------- Una propiedad dentro del payload. 
                                    Declara que newActivity debe ser un
                                    objeto que siga la estructura del 
                                    tipo Activity (definido en types)
*/

// Define las acciones posibles que se pueden despachar al reducer
export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity : Activity}} | 
    {type: 'save-activeId', payload: {id : Activity['id']}} |
    {type: 'delete-activity', payload: {id : Activity['id']}} |
    {type: 'restar-app'} 
    

// Define la estructura del estado que maneja el reducer
export type ActivitySatate = {
    activities : Activity[], 
    activeId: Activity['id']
}

const localStorageACtivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// Estado inicial
export const initialState : ActivitySatate = {
    activities: localStorageACtivities(), 
    activeId: ''
}

export const activityReducer = (state: ActivitySatate = initialState, action: ActivityActions ) => {

    // Este codigo maneja la logica para actualizar el state
    if(action.type === 'save-activity'){
        
        // Si existe un activeId, se actualiza la actividad existente
        let updatedActivities : Activity[] = []
        if(state.activeId){
            // Reemplaza la actividad que coincide con activeId por la nueva
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else{
            // Si no hay activeId, se agrega como nueva actividad
            updatedActivities =[...state.activities, action.payload.newActivity]
        }
        return {
            ...state, 
            activities: updatedActivities, 
            activeId: '' // Resetea el ID activo después de guardar
        }
    }

    if(action.type === 'save-activeId'){
        // Guarda el ID de la actividad seleccionada para edición
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return{
            ...state, 
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restar-app'){
        return{
            activities: [], 
            activeId: ''
        }
    }

    // Si la acción no coincide, se devuelve el estado sin cambios
    return state
}