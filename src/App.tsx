import { DarkModeProvider } from "./context/DarkMode";
import Router from "./Router"

function App() {
    return (
        <DarkModeProvider>
            <div className="h-screen flex bg-slate-100 dark:bg-slate-800 dark:text-white">
                <Router />
            </div>
        </DarkModeProvider>
    )
}  

export default App;
