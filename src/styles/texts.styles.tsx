import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        pageTitle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            fontSize: theme.fontSizes.large,
            textAlign: 'center',
            padding: theme.spacing.medium,
            flexShrink: 1,
        },
        smallText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
            textAlign: 'center',
            marginTop: theme.spacing.smallMedium,
            marginBottom: theme.spacing.smallMedium,
            flexShrink: 1,
        },
        smallMediumText: {
            color: theme.colors.primary,
            fontSize: theme.fontSizes.smallMedium,
            textAlign: 'center',
            marginTop: theme.spacing.smallMedium,
            marginBottom: theme.spacing.smallMedium,
            flexShrink: 1,
        },
        mediumText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.medium,
            marginTop: theme.spacing.smallMedium,
            marginBottom: theme.spacing.smallMedium,
            textAlign: 'center',
            flexShrink: 1,
        },
        mediumLargeText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.mediumLarge,
            marginTop: theme.spacing.smallMedium,
            marginBottom: theme.spacing.smallMedium,
            textAlign: 'center',
            flexShrink: 1,
        },
        largeText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: theme.fontSizes.large,
            textAlign: 'center',
            flexShrink: 1,
        },
        inputLabel: {
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            fontSize: theme.fontSizes.small,
            textAlign: 'left',
            marginTop: theme.spacing.medium,
            marginLeft: theme.spacing.small,
            marginRight: theme.spacing.small,
            paddingLeft: theme.spacing.large,
            paddingRight: theme.spacing.large,
        },
        userWelcome: {
            fontSize: theme.fontSizes.mediumLarge,
            color: theme.colors.background,
            textAlign: 'center',
            paddingTop: theme.spacing.medium,
            paddingBottom: theme.spacing.medium,
            paddingLeft: theme.spacing.medium,
            textDecorationStyle: 'solid',
            flexWrap: 'wrap',
        },
        userData: {
            fontSize: theme.fontSizes.small,
            color: theme.colors.background,
            textAlign: 'left',
            paddingLeft: theme.spacing.medium,
            paddingTop: theme.spacing.medium,
            paddingBottom: theme.spacing.medium,
        },
        errorText: {
            backgroundColor: "pink",
            color: "red",
            fontSize: theme.fontSizes.small,
            textAlign: 'center',
            padding: theme.spacing.medium,
        },
        sucessText: {
            backgroundColor: "lightgreen",
            color: "green",
            fontSize: theme.fontSizes.small,
            textAlign: 'center',
            padding: theme.spacing.medium,
        }
    });
    return styles;
};