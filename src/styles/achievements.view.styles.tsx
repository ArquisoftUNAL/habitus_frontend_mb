import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.colors.background,
            width: "100%",
            height: "100%",
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
            width: "100%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary,
        },
        addAchievementContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            height: "100%",
            width: "100%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
        },
        modalView: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.secondary,
            height: "60%",
            width: "80%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 20,
        },
        habitText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
            textAlign: 'center',
            marginBottom: theme.spacing.small,
            minWidth: "100%",
            minHeight: 10,
        },
        habitItemContainer: {
            flex: 1,
            flexDirection: 'column',
            minWidth: "100%",
            minHeight: 10,
            maxHeight: 40,
            backgroundColor: theme.colors.primary,
        },
        habitsList: {
            flex: 3,
            flexDirection: 'row',
            width: "100%",
            backgroundColor: theme.colors.tertiary,
        },
        milestoneView: {
            flexDirection: 'row',
            marginBottom: theme.spacing.medium,
            maxWidth: "100%",
        },
        milestoneInfo: {
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 20,
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.small,
            height: "100%",
        },
        milestoneInfoText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
            textAlign: 'center',
        },
        milestoneProgressContainer: {
            minWidth: "50%",
            maxWidth: "50%",
            height: "100%",
            backgroundColor: theme.colors.background,
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.medium,
        }
    });
    return styles;
};