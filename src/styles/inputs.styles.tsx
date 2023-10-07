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
        }
    });
    return styles;
};