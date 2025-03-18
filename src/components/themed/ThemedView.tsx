import { View, ViewProps } from "react-native"
import { useTheme } from "../../context/ThemeContext";

const ThemedView = ({ style, children, ...props }: ViewProps) => {
    const { theme } = useTheme();
    return (
        <View style={[style, { backgroundColor: theme.colors.background.primary }]} {...props}>
            {children}
        </View>
    )
}

export default ThemedView;