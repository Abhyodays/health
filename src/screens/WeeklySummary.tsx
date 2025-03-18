import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native"
import RoundedCard from "../components/RoundedCard"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import CardRow from "../components/CardRow"
import Bar from "../components/Bar"
import ThemedText from "../components/themed/ThemedText"
import { useTheme } from "../context/ThemeContext"

const WeeklySummary = () => {
    const medication = useSelector((state: RootState) => state.medication);
    const weeklySummary = medication.weeklyAdherence;
    const medications = medication.medications;
    const { theme } = useTheme()


    return (
        <View style={{ backgroundColor: theme.colors.background.secondary, flex: 1 }}>
            <RoundedCard>
                <ThemedText style={styles.title}>Weekly Adherence</ThemedText>
                {/* { Graph} */}
                <View style={styles.graph_container}>
                    {weeklySummary.daily.map(day => <Bar title={day.day} value={day.rate} />)}
                </View>
            </RoundedCard>
            <RoundedCard style={styles.card}>
                <ThemedText style={styles.title}>Statistics</ThemedText>
                <CardRow title="Overall Adherence" value={`${weeklySummary.overall}%`} />
                <CardRow title="Doses Taken" value={`${weeklySummary.dosesTaken} out of ${weeklySummary.totalDoses}`} />
            </RoundedCard>
            <RoundedCard style={styles.card}>
                <ThemedText style={styles.title}>Medication Breakdown</ThemedText>
                <FlatList
                    data={medications}
                    renderItem={({ item }) => <CardRow title={item.name} value={item.adherence.weekly} />}
                    keyExtractor={(item) => item.id}
                />
            </RoundedCard>
        </View >
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    card: {
        gap: 10
    },
    graph_container: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    }
})

export default WeeklySummary