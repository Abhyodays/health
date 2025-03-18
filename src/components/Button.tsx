import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

type PropType = {
    title: string,
    backgroundColor: string,
    onPress?: () => void,
    labelStyle: TextStyle
}
const Button = ({ title, onPress, backgroundColor, labelStyle }: PropType) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={[{ backgroundColor }, styles.container]} onPress={onPress}>
            <View>
                <Text style={[styles.button_text, labelStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    button_text: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})
export default Button;