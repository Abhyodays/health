import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../context/ThemeContext"
import ThemedText from "../components/themed/ThemedText"
import FAB from "../components/FAB"
import ThemedView from "../components/themed/ThemedView"
import { Circle } from 'react-native-progress'
import { common } from "../constants/colors"
import medicationData from '../data/medication.json'
import MedicationTracker from "../components/MedicationTracker"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { setMedications } from "../redux/features/medicationSlice"

const Home = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch<AppDispatch>();
    const medication = useSelector((state: RootState) => state.medication);
    console.log(medication.todayProgress)
    const todayProgress = medication.todayProgress.totalForToday > 0
        ? (medication.todayProgress.takenToday / medication.todayProgress.totalForToday)
        : 0;

    useEffect(() => {
        dispatch(setMedications(medicationData.medications))
    }, [dispatch])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
            <ThemedView style={styles.header}>
                <ThemedText style={styles.main_title}>Medications</ThemedText>
                <FAB />
            </ThemedView>
            {/* Card to show today's progress */}
            <ThemedView style={styles.today_progress_card}>
                <ThemedText style={styles.title}>Today's Progress</ThemedText>
                <View style={styles.progress_details}>
                    <Circle size={75} color={common.orange} progress={todayProgress} thickness={8}
                        unfilledColor={theme.colors.background.secondary} strokeCap="round"
                        showsText={true} borderWidth={0}
                        textStyle={{ ...styles.progress_text, color: theme.colors.text.primary }}
                    />
                    <View>
                        <ThemedText style={styles.progress_details_text}>2 of 3 medications taken</ThemedText>
                        <ThemedText style={styles.progress_details_text}>Next: Atrovastin at 3:00 PM</ThemedText>
                    </View>
                </View>
            </ThemedView>

            <View style={styles.timeline_container}>
                <ThemedText style={styles.title}>Timeline</ThemedText>
                <MedicationTracker />
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    main_title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    today_progress_card: {
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    progress_details: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    progress_details_text: {
        fontSize: 16,
        fontWeight: '500'
    },
    progress_text: {
        fontWeight: 'bold',
        fontSize: 22
    },
    timeline_container: {
        paddingHorizontal: 20
    }
})

export default Home;