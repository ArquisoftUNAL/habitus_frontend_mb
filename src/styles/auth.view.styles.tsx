import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            height: '100%',
        },
        dateViewText: {
            fontSize: theme.fontSizes.medium,
            color: theme.colors.primary,
            textAlign: 'center',
        }
    });
    return styles;
};