import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Medication } from '../../types/Medication';


interface WeeklyAdherence {
  overall: number;
  dosesTaken: number;
  totalDoses: number;
  daily: { day: string; rate: number }[];
}

interface TodayProgress {
  adherenceRate: number;
  totalForToday: number;
  takenToday: number;
}

interface MedicationState {
  medications: Medication[];
  weeklyAdherence: WeeklyAdherence;
  todayProgress: TodayProgress;
}

const initialState: MedicationState = {
  medications: [],
  weeklyAdherence: {
    overall: 0,
    dosesTaken: 0,
    totalDoses: 0,
    daily: [],
  },
  todayProgress: {
    adherenceRate: 0,
    totalForToday: 0,
    takenToday: 0,
  },
};

const medicationSlice = createSlice({
  name: 'medication',
  initialState,
  reducers: {
    initialize(state, action:PayloadAction<MedicationState>){
        state = action.payload
    },
    setMedications(state, action: PayloadAction<Medication[]>) {
      console.log("initializing", action.payload)
      state.medications = action.payload;
    },
    updateMedicationStatus(
      state,
      action: PayloadAction<{ id: string; status: 'taken' | 'upcoming'; takenAt: string | null }>
    ) {
      const medication = state.medications.find((med) => med.id === action.payload.id);
      if (medication) {
        medication.status = action.payload.status;
        medication.takenAt = action.payload.takenAt;
      }
    },
    updateInventory(state, action: PayloadAction<{ id: string; inventory: number }>) {
      const medication = state.medications.find((med) => med.id === action.payload.id);
      if (medication) {
        medication.inventory = action.payload.inventory;
      }
    },
    setWeeklyAdherence(state, action: PayloadAction<WeeklyAdherence>) {
      state.weeklyAdherence = action.payload;
    },
    setTodayProgress(state, action: PayloadAction<TodayProgress>) {
      state.todayProgress = action.payload;
    },
  },
});

export const { setMedications, updateMedicationStatus, updateInventory, setWeeklyAdherence, setTodayProgress,initialize } =
  medicationSlice.actions;

export default medicationSlice.reducer;
