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
        accordionSuperContainer: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.background,
            paddingHorizontal: '1%',
        },
        accordionContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.tertiary,
            marginHorizontal: 0,
            paddingHorizontal: 0
        },
        accordionSectionContainer: {
            flex: 1,
            alignItems: 'center',
            width: '100%',
            minHeight: '50%',
            maxHeight: '100%',
            backgroundColor: theme.colors.tertiary,
            marginVertical: 10,
            paddingHorizontal: 0,
            paddingVertical: 0,
        },
        accordionHeader: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 5,
            minWidth: '100%',
            paddingHorizontal: 10,
        },
        accordionHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '10%',
        },
        accordionHeaderText: {
            flex: 1,
            width: '100%',
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        container: {
            backgroundColor: theme.colors.background,
            height: '100%',
        },
        colorPickerContainer: {
            padding: theme.spacing.medium,
        },
        colorPickerCircleContainer: {
            padding: theme.spacing.medium,
            paddintTop: theme.spacing.extraLarge,
            alignItems: 'center',
            justifyContent: 'center',
        },
        colorPickerBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: "20%",
            marginTop: "20%",
            width: '60%',
            height: '60%',
        },
        colorText: {
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: theme.spacing.medium,
        }
    });
    return styles;
};