import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Medication } from "../types/Medication";
import ThemedView from "./themed/ThemedView";
import ThemedText from "./themed/ThemedText";
import { getTimeDifferenceMessage } from "../utils/getTimeDifferenceMessage";
import { useTheme } from "../context/ThemeContext";
import { common } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../router/HomeStack";

const MedicationCard = ({ data }: { data: Medication }) => {
    const { name, time, quantity, takenAt, dosage, instructions, status, id } = data;
    const { theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
    const gotoDetails = () => {
        navigation.navigate("Details", { id })
    }
    return (
        <TouchableOpacity onPress={gotoDetails} activeOpacity={0.3}>
            <ThemedView style={styles.container}>
                <View style={styles.card_header}>
                    <ThemedText style={styles.title}>{name}</ThemedText>
                    <Text style={[styles.text, { color: theme.colors.text.secondary }]}>{time}</Text>
                </View>
                <Text numberOfLines={1} style={[styles.text, { color: theme.colors.text.secondary }]}>{`${quantity} - ${dosage} - ${instructions}`}</Text>
                <Text style={[styles.text, { color: status === "taken" ? common.green : common.blue }]}>
                    {status === "taken" ? `Taken at ${takenAt}` : getTimeDifferenceMessage(time)}
                </Text>
            </ThemedView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 20,
        gap: 2
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16
    }

})
export default MedicationCard;