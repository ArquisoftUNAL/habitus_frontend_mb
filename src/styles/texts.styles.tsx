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
        }
    });
    return styles;
};