import { Text, View } from "react-native"
import Router from "./router/Router";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </Provider>
    )
}

export default App;