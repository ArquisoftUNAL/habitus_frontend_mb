import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.colors.background,
            height: "100%",
            width: "100%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.medium,
        },
        habitsContainer: {
            backgroundColor: theme.colors.secondary,
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.medium,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderRightWidth: 1,
            borderRightColor: theme.colors.primary,
        },
        habitItem: {
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.primary,
            backgroundColor: theme.colors.background,
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 20,
            marginBottom: theme.spacing.small,
        },
        habitItemText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
        },
        habitItemSelected: {
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            height: "10%",
            width: "100%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.secondary,
            borderLeftWidth: 5,
            borderLeftColor: theme.colors.tertiary,
        },
        achievementsContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            height: "30%",
            width: "100%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary,
        },
        milestonesContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            height: "30%",
            width: "100%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary,
        },
    });
    return styles;
};