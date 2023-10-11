import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        separator: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            tintColor: theme.colors.primary,
            width: '80%',
            height: '100%',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            padding: 0
        },
        separatorContainer: {
            alignItems: 'center',
            width: '100%',
            height: 1,
            paddingVertical: theme.spacing.medium,
        }
    });
    return styles;
};