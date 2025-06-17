/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, type Dispatch } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { ActivityActions } from "../reducers/activity-reducer"

type ActivitiesListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivitiesListProps) {

    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities])
    return (
        <>

            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
            {activities.map(activity => (
                <div
                    key={activity.id}
                    className="px-5 py-10 bg-white mt-5 flex justify-between"
                >

                    <div className="space-y-2 relative">
                        <p className= {`absolute -top-8 -left-4 py-2 uppercase font-bold ${activity.category === 1 ? 'text-blue-400' : 'text-purple-400'}`}>
                            {categoryName(+ activity.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className="font-black text-4xl text-blue-800">
                            {activity.calories} {''}
                            <span>Calorias</span>
                        </p>


                    </div>
                    
                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({type: 'save-activeId', payload: {id: activity.id}})}
                        >
                            <PencilSquareIcon
                                className="h8 w-8 text-gray-800"
                            />
                        </button>
                    </div>

                </div>
            ))}

        </>
  ) 
}
