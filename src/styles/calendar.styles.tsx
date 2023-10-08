import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        container: {
            flex: 7,
            marginHorizontal: "auto",
            backgroundColor: theme.colors.background,
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.large,
            width: "100%",
        },
        rowContainer: {
            flexDirection: 'row',
            paddingVertical: theme.spacing.smallMedium,
        },
        headerCellContainer: {
            alignItems: 'center',
            width: '20%',
            flex: 1,
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.background,
        },
        headerCellContainerText: {
            color: theme.colors.background,
        },
        markedCellContainerText: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            fontWeight: 'bold',
            borderRadius: 20,
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        commonCellContainerText: {
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            textAlign: 'center',
            width: '100%'
        },
        cellContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        cell: {
            width: '80%',
            alignContent: 'center',
            justifyContent: 'center'
        },
        typeText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.medium,
            marginBottom: theme.spacing.smallMedium,
            textAlign: 'center',
        },
        monthName: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.large,
            textAlign: 'center'
        },
        buttonsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: theme.spacing.smallMedium,
        },
        navigatorButton: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.background,
        },
        navigatorSpacer: {
            flex: 5,
        },
        navigationButtonText: {
            color: theme.colors.background,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.medium,
            textAlign: 'center'
        },
        selectedDayContainer: {
            borderTopWidth: 3,
            borderTopColor: theme.colors.primary,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: theme.spacing.smallMedium,
        },
        selectedDayTextTitle: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.medium,
            paddingVertical: theme.spacing.smallMedium,
            textAlign: 'center',
            flex: 4
        },
        selectedDayText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.medium,
            textAlign: 'center',
            flex: 3
        },

    });
    return styles;
};