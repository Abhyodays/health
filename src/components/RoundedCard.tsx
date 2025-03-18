import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ThemedView from "./themed/ThemedView"
import { StyleSheet } from "react-native";


const RoundedCard = ({ style, children, ...props }: ViewProps) => {
    return (
        <ThemedView style={styles.container}>
            {children}
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 20
    }
})
export default RoundedCard;