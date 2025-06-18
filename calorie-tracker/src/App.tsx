/* eslint-disable @typescript-eslint/no-unused-vars */

import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"

function App() {
  
  // Hook useReducer para manejar el estado global del componente.
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])   

  return (
    <>
      <header className="bg-gray-600 py-5 ">
        <div className="max-w-4xl mx-auto flex justify-between">

          <h1 className="text-center font-bold text-white uppercase text-4xl">
            Contador de Calorias
          </h1>

          <button
            className="bg-gray-500 hover:bg-red-600 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restar-app'})}
          >
            Reiniciar App
          </button>

        </div>
      </header>

      <section className="bg-blue-400 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}  
            state={state}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

    </>
  )
}

export default App
