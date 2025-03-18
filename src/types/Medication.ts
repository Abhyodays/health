
export type Medication = {
    id: string;
    name: string;
    dosage: string;
    quantity: string;
    time: string;
    status: string;
    instructions: string;
    specialNotes: string;
    takenAt: string | null;
    inventory: number;
    adherence: {
        weekly: number
    }
}