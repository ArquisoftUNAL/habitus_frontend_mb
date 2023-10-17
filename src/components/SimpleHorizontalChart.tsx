import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from "../themes/Theme.context";
import { createStyles } from "../styles/graphics.styles";

interface SinglePieChartProps {
    data: any;
};

export const SimpleBarChart: React.FC<SinglePieChartProps> = ({ data }) => {
    const { theme } = useTheme();

    const styles = createStyles(theme);

    return (
        <View>
            <BarChart
                horizontal
                barWidth={20}
                data={data}
                backgroundColor={theme.colors.background}
            />
        </View>
    );
}