import BudgetForm from "./components/BudgetForm"

function App() {
  return (
    <>
      <header className="bg-zinc-900 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-zinc-300 shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm
        
        />
      </div>
    </>
  )
} 

export default App
