import { FlatList, StyleSheet, Text, View } from 'react-native';
import medicationData from '../data/medication.json'
import { Medication } from '../types/Medication';
import MedicationCard from './MedicationCard';
import StatusTracker from './StatusTracker';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MedicationTracker = () => {
    const medications = useSelector((state: RootState) => state.medication.medications);
    return (
        <View style={styles.container}>
            <StatusTracker />
            <FlatList
                data={medications}
                renderItem={({ item }) => <MedicationCard data={item} />}
                keyExtractor={(item: Medication) => item.id}
                contentContainerStyle={styles.card_container}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10
    },
    card_container: {
        gap: 10
    }
})

export default MedicationTracker;