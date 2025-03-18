import { Text, TextProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const ThemedText = ({ style, children, ...props }: TextProps) => {
    const { theme } = useTheme();
    return (
        <Text style={[{ color: theme.colors.text.primary }, style]} {...props}>
            {children}
        </Text>
    )
}
export default ThemedText;