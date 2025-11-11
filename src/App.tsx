import AppLayout from "./components/Layount/AppLayout"
import { AppContextProvider } from "./shared/AppContext"

function App() {

  return (
    <AppContextProvider>
       <AppLayout/>
    </AppContextProvider>
  )
}

export default App
