import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { common } from "../constants/colors";

type PropType = {
    onPress?: () => void
}
const FAB = ({ onPress }: PropType) => {
    const { theme } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <View style={styles.container}>
                <Text style={styles.icon}>+</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: common.orange,
        borderRadius: '50%',
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default FAB;