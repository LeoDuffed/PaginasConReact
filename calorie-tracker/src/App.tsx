/* eslint-disable @typescript-eslint/no-unused-vars */

import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { useReducer } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-blue-500 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">

          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <button>

          </button>

        </div>
      </header>

      <section className="bg-blue-300 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}  
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          
        />
      </section>
    </>
  )
}

export default App
