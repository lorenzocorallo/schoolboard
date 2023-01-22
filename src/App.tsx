import { DarkModeProvider } from "./context/DarkMode";
import Router from "./Router"

function App() {
    return (
        <DarkModeProvider>
            <div className="h-screen flex">
                <Router />
            </div>
        </DarkModeProvider>
    )
}  

export default App;
