import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home";
import WeeklySummary from "../screens/WeeklySummary";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useTheme } from "../context/ThemeContext";
import HomeStack from "./HomeStack";

export type BottomTabsParamList = {
    HomeStack: undefined,
    Summary: undefined
}
const Router = () => {
    const Tab = createBottomTabNavigator<BottomTabsParamList>();
    const { theme } = useTheme();
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={theme.colors.background.primary} barStyle={theme.title === "dark" ? 'light-content' : 'dark-content'} />
            <Tab.Navigator initialRouteName="HomeStack"
                screenOptions={
                    {
                        headerShown: false,
                        tabBarIconStyle: {
                            display: "none"
                        },
                        tabBarLabelStyle: {
                            fontSize: 16
                        },
                        tabBarStyle: {
                            backgroundColor: theme.colors.background.primary
                        }
                    }
                }
            >
                <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Today' }} />
                <Tab.Screen name="Summary" component={WeeklySummary} options={{ title: 'Calendar' }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Router;