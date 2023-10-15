import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        measurableResumeContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            minWidth: "100%",
            paddingHorizontal: theme.spacing.small,
        },
        measurableResumeItemContainer: {
            flexBasis: '50%',
            maxWidth: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ynResumeContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        ynResumeItemContainer: {
            flexDirection: 'column',
            flexBasis: '33%',
            justifyContent: 'center',
            alignItems: 'center',
        },

        historyContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        historyItemContainer: {
            flexBasis: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.small,
            borderRadius: 20,
            borderStyle: 'dashed'
        },
        streaksContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: theme.spacing.medium,
        },
    });
    return styles;
};