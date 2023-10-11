import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        mainContainer: {
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center',
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        habitContainer: {
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dateContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerContainer: {
            backgroundColor: theme.colors.primary,
            width: '100%',
            borderWidth: 1,
            borderColor: theme.colors.background,
        },
        headerText: {
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
            color: theme.colors.background,
            textAlign: 'center',
        },
        itemContainer: {
            backgroundColor: theme.colors.background,
        },
        itemText: {
            fontSize: theme.fontSizes.medium,
            color: theme.colors.primary,
        },
        itemCheckbox: {
            color: theme.colors.primary,
        },
        itemInput: {
            color: theme.colors.primary,
        },

        // Accordeon case
        accordeonStyle: {
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.primary,
        },
        accordeonHeader: {
            backgroundColor: theme.colors.primary,
            borderWidth: 1,
            borderColor: theme.colors.background,
        },
    });
    return styles;
};