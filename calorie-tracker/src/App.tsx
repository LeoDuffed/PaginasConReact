/* eslint-disable @typescript-eslint/no-unused-vars */

import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { useReducer } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-gray-600 py-5 ">
        <div className="max-w-4xl mx-auto flex justify-between">

          <h1 className="text-center font-bold text-white uppercase text-4xl">
            Contador de Calorias
          </h1>

          <button>

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
