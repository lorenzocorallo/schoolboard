import { DarkModeProvider } from "./context/DarkMode";
import Router from "./Router";

export default function Main() {
    return (
        <DarkModeProvider>
            <Router />
        </DarkModeProvider>
    ) 
}
