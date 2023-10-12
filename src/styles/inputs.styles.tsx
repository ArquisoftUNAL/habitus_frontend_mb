import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        largeTextInput: {
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
            textAlign: 'left',
            marginTop: theme.spacing.medium,
            marginLeft: theme.spacing.large,
            marginRight: theme.spacing.large,
            paddingLeft: theme.spacing.medium,
            paddingRight: theme.spacing.medium,
            borderColor: theme.colors.secondary,
            borderWidth: 2,
        },
        selectionContainer: {
            flex: 1,
            flexDirection: 'row',
            borderRadius: 40,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.background,
            marginTop: theme.spacing.medium,
            marginLeft: theme.spacing.extraLarge,
            marginRight: theme.spacing.extraLarge,
            paddingHorizontal: 0
        },
        itemContainer: {
            flex: 1,
            flexDirection: 'column',
            padding: 0,
            margin: 0,
        },
        selectedLeftItemText: {
            textAlign: 'center',
            color: theme.colors.background,
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: 40,
            borderBottomLeftRadius: 40,
            fontSize: theme.fontSizes.medium,
        },
        selectedRightItemText: {
            textAlign: 'center',
            color: theme.colors.background,
            backgroundColor: theme.colors.primary,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            fontSize: theme.fontSizes.medium,
        },
        unselectedLeftItemText: {
            textAlign: 'center',
            color: theme.colors.primary,
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 40,
            borderBottomLeftRadius: 40,
            fontSize: theme.fontSizes.medium,
        },
        unselectedRightItemText: {
            textAlign: 'center',
            color: theme.colors.primary,
            backgroundColor: theme.colors.background,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            fontSize: theme.fontSizes.medium,
        },

        // Combo box
        comboContainer: {
            flex: 1,
            flexDirection: 'row',
            borderRadius: 40,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.background,
            marginTop: theme.spacing.medium,
            marginLeft: theme.spacing.extraLarge,
            marginRight: theme.spacing.extraLarge,
            paddingVertical: theme.spacing.small,
            paddingLeft: theme.spacing.medium,
        },
        comboContainerStyle: {

        },
        comboStyle: {

        },
        comboText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.medium,
        }
    });
    return styles;
};