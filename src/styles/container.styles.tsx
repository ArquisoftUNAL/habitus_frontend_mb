import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        fullPage: {
            width: "100%",
            height: "100%",
            padding: theme.spacing.small,
            backgroundColor: theme.colors.background,
        },
        fullHorizontal: {
            width: "100%",
            padding: theme.spacing.small,
            backgroundColor: theme.colors.background,
        },
        fullVertical: {
            height: "100%",
            padding: theme.spacing.small,
            backgroundColor: theme.colors.background,
        },
    });
    return styles;
};