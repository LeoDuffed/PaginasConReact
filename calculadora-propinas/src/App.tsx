import { menuItems } from "./data/db"
import MenuItems from "./types/MenuItem"

function App() {

  return (
    <>
 
      <header className="bg-purple-400 py-5">
        <h1 className="text-center text-4xl font-black">
          Calculadora de Propinas
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">

        <div className="p-5">

            <h2 className="text-4xl font-black">Menú</h2>

            <div className="space-y-2 mt-8">
              {menuItems.map(item => (
                <MenuItems
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

        </div>

        <div>
          <h2>Consumo</h2>
        </div>

      </main>

    </> 
  )
}

export default App
