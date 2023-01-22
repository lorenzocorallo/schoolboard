import { DarkModeProvider } from "./context/DarkMode";
import Router from "./Router"

function App() {
    return (
        <DarkModeProvider>
            <Router />
        </DarkModeProvider>
    )
}  
