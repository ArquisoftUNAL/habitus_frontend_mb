import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        chartLegendText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        chartLegendContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
        },
    });
    return styles;
};