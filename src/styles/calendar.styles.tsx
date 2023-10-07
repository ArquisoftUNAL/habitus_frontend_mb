import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        drawer: {
            alignItems: 'center',
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            flexDirection: 'row',
            height: "100%",
            paddingHorizontal: theme.spacing.small,
            width: '60%',
            tintColor: theme.colors.primary
        },
        header: {
            backgroundColor: theme.colors.background,
            tintColor: theme.colors.primary
        },
        item: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            height: "10%",
            paddingHorizontal: theme.spacing.small,
            width: '100%'
        },
    });
    return styles;
};