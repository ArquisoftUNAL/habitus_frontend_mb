import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "./../themes/Theme.context";
import { createStyles } from "./../styles/graphics.styles";

interface SinglePieChartProps {
    data: any;
    showText?: boolean;
    externalRadius?: number;
    internalRadius?: number;
    fontSizeOverride?: number;
    customCenterText?: any;
};

export const SinglePieChart: React.FC<SinglePieChartProps> = ({
    data, showText = true, externalRadius = 100, internalRadius = 80,
    fontSizeOverride = null, customCenterText = null
}) => {
    const { theme } = useTheme();

    const styles = createStyles(theme);

    return (
        <View>
            <PieChart
                donut
                radius={externalRadius}
                innerRadius={internalRadius}
                data={data}
                backgroundColor={theme.colors.background}
                centerLabelComponent={() => {

                    if (!showText)
                        return null;

                    return (
                        <View style={styles.chartLegendContainer}>
                            {
                                customCenterText ?
                                    <Text
                                        style={[
                                            styles.chartLegendText,
                                            { fontSize: fontSizeOverride || theme.fontSizes.small }
                                        ]}
                                    >
                                        {customCenterText}
                                    </Text>
                                    :
                                    data.map((item: any, index: number) => {
                                        return (
                                            <Text
                                                key={index}
                                                style={[
                                                    styles.chartLegendText,
                                                    { fontSize: fontSizeOverride || theme.fontSizes.small }
                                                ]}
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