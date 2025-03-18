import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native"
import medicationData from '../data/medication.json'
import ThemedView from "../components/themed/ThemedView";
import ThemedText from "../components/themed/ThemedText";
import { common } from "../constants/colors";
import { useTheme } from "../context/ThemeContext";
import RoundedCard from "../components/RoundedCard";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setTodayProgress, updateMedicationStatus } from "../redux/features/medicationSlice";

const MedicationDetails = () => {
    const route = useRoute();
    const { id } = route.params;
    const { theme } = useTheme()
    const dispatch = useDispatch<AppDispatch>();
    const medication = useSelector((state: RootState) => state.medication)
    const medications = medication.medications;
    const todayProgress = medication.todayProgress;

    const selectedMedication = medications.find(med => med.id === id);
    const isLowInventory = selectedMedication?.inventory && selectedMedication.inventory > 5 ? false : true;
    const isTaken = selectedMedication?.status === "taken";

    const updateStatus = () => {
        dispatch(updateMedicationStatus({
            id, status: 'taken', takenAt: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            })
        }))
        const newAdherenceRate = Math.round((todayProgress.takenToday + 1) / todayProgress.totalForToday) * 100;
        dispatch(setTodayProgress({ ...todayProgress, takenToday: todayProgress.takenToday + 1, adherenceRate: newAdherenceRate }))
    }
    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
            <ThemedView style={styles.header}>
                <View style={[styles.profile_circle, { backgroundColor: theme.colors.background.secondary }]}>
                    <Text style={styles.circle_text}>{selectedMedication?.name.slice(0, 1)}</Text>
                </View>
                <View>
                    <ThemedText style={styles.header_title}>{selectedMedication?.name}</ThemedText>
                    <Text style={styles.header_subtitle}>
                        {`${selectedMedication?.dosage} - ${selectedMedication?.quantity} - ${selectedMedication?.instructions}`}
                    </Text>
                </View>
            </ThemedView>
            <RoundedCard>
                <ThemedText style={styles.card_title}>Schedule</ThemedText>
                <View style={styles.card_details_row}>
                    <Text style={[styles.card_details_text, styles.card_details_key]}>Time</Text>
                    <ThemedText style={[styles.card_details_text]}>{selectedMedication?.time}</ThemedText>
                </View>
                <View style={styles.card_details_row}>
                    <Text style={[styles.card_details_text, styles.card_details_key]}>Frequency</Text>
                    <ThemedText style={[styles.card_details_text]}>Daily</ThemedText>
                </View>
            </RoundedCard>

            <RoundedCard>
                <ThemedText style={styles.card_title}>Instructions</ThemedText>
                <View style={styles.card_details_row}>
                    <Text style={[styles.card_details_text, styles.card_details_key]}>How to take</Text>
                    <ThemedText style={[styles.card_details_text]}>{selectedMedication?.instructions}</ThemedText>
                </View>
                <View style={styles.card_details_row}>
                    <Text style={[styles.card_details_text, styles.card_details_key]}>Special notes</Text>
                    <ThemedText style={[styles.card_details_text]}>{selectedMedication?.specialNotes}</ThemedText>
                </View>
            </RoundedCard>

            <RoundedCard>
                <ThemedText style={styles.card_title}>Inventory</ThemedText>
                <View style={styles.card_details_row}>
                    <Text style={[styles.card_details_text, styles.card_details_key]}>Remaining</Text>
                    <ThemedText style={[styles.card_details_text, isLowInventory ? styles.text_danger : {}]}>{`${selectedMedication?.inventory} tablets ${isLowInventory ? "(Low)" : ""}`}</ThemedText>
                </View>
            </RoundedCard>
            <View style={styles.button_container}>
                <Button title={isTaken ? "Already taken" : "Mark as taken"} labelStyle={{ color: 'white' }}
                    backgroundColor={isTaken ? common.orange : common.blue} onPress={updateStatus} disabled={isTaken} />
                <Button title="Edit Medication" labelStyle={{ color: common.blue }} backgroundColor={common.light_gray} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        alignItems: 'center'
    },
    profile_circle: {
        height: 75,
        width: 75,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle_text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: common.orange
    },
    header_title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    header_subtitle: {
        fontSize: 16,
        color: common.gray
    },
    card_title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    card_details_row: {
        flexDirection: 'row',
        marginVertical: 5
    },
    card_details_text: {
        fontSize: 18
    },
    card_details_key: {
        width: 120,
        color: common.gray
    },
    text_danger: {
        fontWeight: 'bold',
        color: 'red'
    },
    button_container: {
        alignItems: 'center',
        gap: 15
    }

})
export default MedicationDetails;