import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "./../themes/Theme.context";
import { createStyles } from "./../styles/graphics.styles";

interface SinglePieChartProps {
    data: any;
};

export const SinglePieChart: React.FC<SinglePieChartProps> = ({ data }) => {

    console.log(data)
    const { theme } = useTheme();

    const styles = createStyles(theme);

    return (
        <View>
            <PieChart
                donut
                innerRadius={80}
                data={data}
                backgroundColor={theme.colors.background}
                centerLabelComponent={() => {
                    return (
                        <View style={styles.chartLegendContainer}>
                            {
                                data.map((item: any, index: number) => {
                                    return (
                                        <Text
                                            key={index}
                                            style={styles.chartLegendText}
                                        >
                                            {item.text + " ~" + (item.value.toFixed(2) * 100) + "%"}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    )
                }}
            />
        </View>
    );
}