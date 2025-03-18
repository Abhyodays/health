import { StyleSheet, Text, View } from "react-native"
import { common } from "../constants/colors"
import { useTheme } from "../context/ThemeContext"
import ThemedText from "./themed/ThemedText"

type PropType = {
    title: string,
    value: string
}

const CardRow = ({ title, value }: PropType) => {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
            <Text style={styles.title}>{title}</Text>
            <ThemedText style={styles.value}>{value}</ThemedText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: common.light_gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5
    },
    title: {
        color: common.gray,
        fontSize: 18
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default CardRow;