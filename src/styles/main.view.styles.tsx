import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        drawerContentView: {
            width: "100%"
        },
        headerBackgroundContainerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary,
        },
        drawerHeader: {
            backgroundColor: theme.colors.primary,
            marginTop: theme.spacing.medium,
            marginBottom: theme.spacing.medium,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.background,
        },
        drawerFooter: {
            alignItems: 'center',
            flexDirection: 'row',
            height: "10%",
            paddingHorizontal: theme.spacing.small,
            marginTop: theme.spacing.medium,
            marginBottom: theme.spacing.medium,
            backgroundColor: "transparent",
            width: '100%',
        },
        drawerFooterItem: {
            alignItems: 'center',
            flexDirection: 'row',
            height: "100%",
            paddingHorizontal: theme.spacing.small,
            marginBottom: theme.spacing.medium,
            width: '50%',

        },
        drawerFooterItemContent: {
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            marginHorizontal: theme.spacing.small,
            padding: 0,
            color: theme.colors.tertiary,
            backgroundColor: theme.colors.primary,
            height: "100%",
            width: '100%',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.background,
        },
        drawer: {
            alignItems: 'flex-start',
            backgroundColor: "transparent",
            color: theme.colors.primary,
            flexDirection: 'row',
            height: "100%",
            paddingHorizontal: theme.spacing.small,
            width: '80%',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: theme.spacing.medium,
            paddingRight: 0,
        },
        drawerContent: {
            alignItems: 'center',
            marginTop: theme.spacing.small,
            justifyContent: 'center'
        },
        item: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginVertical: theme.spacing.small,
            height: 50,
            color: theme.colors.primary,
            backgroundColor: theme.colors.background,
            width: '100%',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.primary,
        },
        itemText: {
            fontSize: theme.fontSizes.medium,
            color: theme.colors.primary,
            marginLeft: theme.spacing.small,
            textAlign: 'center',
            width: '100%',
        },
    });
    return styles;
};