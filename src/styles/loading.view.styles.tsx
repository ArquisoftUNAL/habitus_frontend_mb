import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        mainLoadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            height: "100%",
            opacity: 0.6,
            backgroundColor: theme.colors.background,
            borderWidht: 1,
            borderColor: theme.colors.primary,
            borderRadius: 10,
        },
        mainLoadingText: {
            padding: theme.spacing.medium,
            fontSize: theme.fontSizes.large,
            color: theme.colors.primary,
            textAlign: 'center',
        },
        imageContainer: {
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
    return styles;
};