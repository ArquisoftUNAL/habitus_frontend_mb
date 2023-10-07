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
            opacity: 0.3,
            backgroundColor: theme.colors.primary,
        },
        mainLoadingText: {
            fontSize: theme.fontSizes.large,
            color: theme.colors.primary,
        }
    });
    return styles;
};