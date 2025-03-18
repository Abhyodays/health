import StepIndicator from 'react-native-step-indicator'
import medicationData from '../data/medication.json'
import { Medication } from '../types/Medication'
import Svg, { Circle, Line } from 'react-native-svg'
import { common } from '../constants/colors'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
const StatusTracker = () => {
    const medications = useSelector((state: RootState) => state.medication.medications);
    const cardHeight = 105;
    const gap = 10;
    const circleOffset = 30;
    const circleRadius = 10;


    const getStatusColor = (status: string) => {
        if (status === "taken") {
            return common.green;
        }
        return common.gray
    }
    const getTotalHeight = () => {
        return medications.length * (cardHeight + gap) - gap;
    };

    const getCirclePosition = (index: number) => {
        return circleOffset + index * (cardHeight + gap);
    };
    const shouldDrawLine = () => {
        return medications.length > 1;
    };

    const getLineEndY = () => {
        if (medications.length <= 1) return 0;
        return getCirclePosition(medications.length - 1);
    };
    return (
        <Svg height={getTotalHeight()} width={30}>
            {shouldDrawLine() && (
                <Line
                    x1="10"
                    y1={circleOffset}
                    x2="10"
                    y2={getLineEndY()}
                    stroke={common.gray}
                    strokeWidth="3"
                />
            )}

            {medications.map((med, index) => (
                <Circle
                    key={med.id}
                    cx="10"
                    cy={getCirclePosition(index)}
                    r={circleRadius}
                    fill={getStatusColor(med.status)}
                    stroke={getStatusColor(med.status)}
                    strokeOpacity="0.4"
                    strokeWidth="4"
                />
            ))}
        </Svg>
    )
}

export default StatusTracker;