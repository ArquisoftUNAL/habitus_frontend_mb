import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        rowContainer: {
            flexDirection: 'row',
        },
        notificationContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            width: "80%",
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            marginHorizontal: theme.spacing.small,
            marginVertical: theme.spacing.small,
        }
    });
    return styles;
};