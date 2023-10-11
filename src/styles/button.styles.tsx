import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        primary: {
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            tintColor: theme.colors.secondary,
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.small,
            borderRadius: theme.spacing.large,
            width: '75%',
        },
        primaryText: {
            color: theme.colors.background,
            padding: theme.spacing.small,
            fontSize: theme.fontSizes.medium,
            textAlign: 'center',
        },
        secondary: {
            alignItems: 'center',
            backgroundColor: theme.colors.tertiary,
            color: theme.colors.primary,
            tintColor: theme.colors.primary,
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.small,
            width: '75%',
            borderRadius: theme.spacing.large,
            borderWidth: 1,
            borderColor: theme.colors.primary,
        },
        secondaryText: {
            color: theme.colors.primary,
            padding: theme.spacing.small,
            fontSize: theme.fontSizes.medium,
            textAlign: 'center',
        }
    });
    return styles;
};