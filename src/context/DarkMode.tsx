import { createContext, HTMLAttributes, ProviderProps, useEffect, useState } from "react";
// import IDarkModeContext from "../types/DarkMode";

interface IDarkModeContext {
	isDarkMode: boolean;
	isUserPreference: boolean;
	setDarkMode: (dark: boolean) => void;
	resetPreference: () => void;
	toggleDarkMode: () => void;
}

const defaultState: IDarkModeContext = {
	isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
	isUserPreference: false,
	setDarkMode: () => {},
	resetPreference: () => {},
	toggleDarkMode: () => {},
};

export const DarkModeContext = createContext<IDarkModeContext>(defaultState);

export const DarkModeProvider = ({ children, ...props }: HTMLAttributes<ProviderProps<boolean>>) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultState.isDarkMode);
	const [isUserPreference, setIsUserPreference] = useState<boolean>(defaultState.isUserPreference);

	const setDarkMode = (dark: boolean) => {
		setIsDarkMode(dark);
		setIsUserPreference(true);
		localStorage.setItem("darkMode", dark.toString());
	};

	const resetPreference = () => {
		setIsUserPreference(false);
		localStorage.removeItem("darkMode");
		setIsDarkMode(defaultState.isDarkMode);
	};

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    }

	useEffect(() => {
		const storedPreference = localStorage.getItem("darkMode");
		if (storedPreference === null) {
			setIsUserPreference(false);
			return;
		}

		const isDark = JSON.parse(storedPreference);
		setIsUserPreference(true);
		setIsDarkMode(isDark);
	}, []);

	useEffect(() => {
		if (isDarkMode) document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, [isDarkMode]);

	return (
		<DarkModeContext.Provider value={{ isDarkMode, setDarkMode, toggleDarkMode, isUserPreference, resetPreference }} {...props}>
			{children}
		</DarkModeContext.Provider>
	);
};
