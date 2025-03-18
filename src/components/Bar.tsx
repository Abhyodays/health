import { StyleSheet, Text, View } from "react-native"
import { common } from "../constants/colors"

type PropType = {
    title: string,
    value: number
}

const Bar = ({ title, value }: PropType) => {
    return (
        <View style={styles.container}>
            <Text style={styles.bar_text}>{title}</Text>
            <View style={[styles.bar, { height: Math.floor(150 * value / 100), backgroundColor: value < 50 ? 'red' : common.green }]} ></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        margin: 5,
    },
    bar: {
        width: 32,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    bar_text: {
        color: common.gray
    }
})

export default Bar;