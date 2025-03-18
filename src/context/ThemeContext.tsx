import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { Theme } from "../types/Theme";
import { Appearance } from "react-native";
import { darkTheme, lightTheme } from "../constants/colors";

type ContextType = {
    theme: Theme,
    toggleTheme: () => void
}

const ThemeContext = createContext<ContextType | null>(null);

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
}

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme);

    const toggleTheme = () => {
        setTheme(previousTheme => {
            return previousTheme.title === "dark" ? lightTheme : darkTheme;
        })
    }

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === "dark") {
                setTheme(darkTheme);
            } else {
                setTheme(lightTheme)
            }
        });
        return () => {
            listener.remove();
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { useTheme, ThemeProvider }