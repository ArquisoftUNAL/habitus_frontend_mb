import {
    StyleSheet
}

    from 'react-native';

import {
    Theme
}

    from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        mainContainer: {
            marginHorizontal: theme.spacing.large,
            marginVertical: theme.spacing.large,
            padding: theme.spacing.large,
            backgroundColor: theme.colors.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 20,
        },

        centerContainer: {
            minWidth: '100%',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 20,
            marginVertical: theme.spacing.small,
        },

        centerContainerSelected: {
            minWidth: '100%',
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 20,
            marginVertical: theme.spacing.small,
        }
    });
    return styles;
}

    ;