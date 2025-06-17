/* eslint-disable @typescript-eslint/no-unused-vars */

import { act } from "react"
import type {Activity} from "../types"


export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity : Activity}} | 
    {type: 'save-activeId', payload: {id : Activity['id']}} 
    

export type ActivitySatate = {
    activities : Activity[], 
    activeId: Activity['id']
}

export const initialState : ActivitySatate = {
    activities: [], 
    activeId: ''
}

export const activityReducer = (state: ActivitySatate = initialState, action: ActivityActions ) => {

    if(action.type === 'save-activity'){
        // Este codigo maneja la logica para actualizar el state
        
        return {
            ...state, 
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if(action.type === 'save-activeId'){
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    return state
}