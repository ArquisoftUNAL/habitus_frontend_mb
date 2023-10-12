import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            height: '100%',
        },
        habitusLogo: {
            width: '30%',
            height: '20%',
            borderRadius: 100,
        }
    });
    return styles;
};