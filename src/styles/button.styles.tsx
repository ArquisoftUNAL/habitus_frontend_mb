import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        primary: {
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            tintColor: theme.colors.secondary,
            marginRight: theme.spacing.extraLarge,
            marginLeft: theme.spacing.extraLarge,
            borderRadius: theme.spacing.large,
        },
        secondary: {
            alignItems: 'center',
            backgroundColor: theme.colors.secondary,
            color: theme.colors.background,
            tintColor: theme.colors.primary,
            marginRight: theme.spacing.extraLarge,
            marginLeft: theme.spacing.extraLarge,
            borderRadius: theme.spacing.large,
        },
        buttonLabel: {
            alignContent: 'center',
            alignItems: 'center',
            color: theme.colors.background,
            fontSize: theme.fontSizes.medium,
            textAlign: 'center',
            padding: theme.spacing.medium,
        }
    });
    return styles;
};