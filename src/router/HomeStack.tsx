import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Home";
import MedicationDetails from "../screens/MedicationDetails";

export type HomeStackParamList = {
    Home: undefined,
    Details: { id: string }
}

const HomeStack = () => {
    const Stack = createStackNavigator<HomeStackParamList>();
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={MedicationDetails} />
        </Stack.Navigator>
    )
}

export default HomeStack