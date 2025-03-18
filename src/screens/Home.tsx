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
import { setMedications, setTodayProgress, setWeeklyAdherence } from "../redux/features/medicationSlice"
import Button from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { BottomTabBarProps, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { BottomTabsParamList } from "../router/Router"

const Home = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch<AppDispatch>();
    const medication = useSelector((state: RootState) => state.medication);
    const nextMedication = medication.medications.find(med => med.status !== "taken");
    const navigation = useNavigation<BottomTabNavigationProp<BottomTabsParamList>>();
    const onViewSummary = () => {
        navigation.navigate("Summary")
    }

    useEffect(() => {
        dispatch(setMedications(medicationData.medications))
        dispatch(setTodayProgress(medicationData.todayProgress));
        dispatch(setWeeklyAdherence(medicationData.weeklyAdherence))
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
                    <Circle size={75} color={common.orange} progress={medication.todayProgress.adherenceRate / 100} thickness={8}
                        unfilledColor={theme.colors.background.secondary} strokeCap="round"
                        showsText={true} borderWidth={0}
                        textStyle={{ ...styles.progress_text, color: theme.colors.text.primary }}
                    />
                    <View>
                        <ThemedText style={styles.progress_details_text}>{medication.todayProgress.takenToday} of {medication.todayProgress.totalForToday} medications taken</ThemedText>
                        <ThemedText style={styles.progress_details_text}>Next: {nextMedication ? `${nextMedication?.name} at ${nextMedication?.time}` : "All medications taken"}</ThemedText>
                    </View>
                </View>
            </ThemedView>

            <View style={styles.timeline_container}>
                <ThemedText style={styles.title}>Timeline</ThemedText>
                <MedicationTracker />
            </View>
            <View style={styles.button_container}>
                <Button
                    title="View Weekly Summary"
                    labelStyle={styles.button}
                    backgroundColor={common.light_gray}
                    onPress={onViewSummary}
                />
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
    },
    button_container: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        color: common.blue,
        fontSize: 18,
        fontWeight: 500
    }
})

export default Home;