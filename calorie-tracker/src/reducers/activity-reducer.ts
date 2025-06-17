/* eslint-disable @typescript-eslint/no-unused-vars */

import type {Activity} from "../types"


export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity : Activity}}

type ActivitySatate = {
    activities : Activity[]
}

export const initialState : ActivitySatate = {
    activities: []
}

export const activityReducer = (state: ActivitySatate = initialState, action: ActivityActions ) => {
    if(action.type === 'save-activity'){
        // Este codigo maneja la logica para actualizar el state
        
    }
}