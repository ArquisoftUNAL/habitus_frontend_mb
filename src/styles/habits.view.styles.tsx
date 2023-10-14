import { StyleSheet } from 'react-native';
import { Theme } from '../themes/Theme.interface';

export const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        accordionSuperContainer: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.background,
            paddingHorizontal: '1%',
        },
        accordionContainer: {
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: '5%',
        },
        accordionSectionContainer: {
            alignItems: 'center',
            width: '100%',
            marginVertical: theme.spacing.small,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 0
        },
        accordionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '100%',
            paddingVertical: theme.spacing.smallMedium,
            backgroundColor: theme.colors.background,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.primary,
        },
        accordionHeaderItem: {
            paddingHorizontal: theme.spacing.smallMedium,
        },
        accordionHeaderRow: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '10%',
        },
        accordionHeaderText: {
            width: '100%',
            fontSize: theme.fontSizes.small,
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.colors.primary,
        },
        accordionBodyContainer: {
            marginTop: theme.spacing.smallMedium,
            minWidth: '100%',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: theme.colors.primary,
        },
        editButton: {
            backgroundColor: '#77ED6B',
            borderRadius: theme.spacing.smallMedium / 2,
            padding: theme.spacing.small
        },
        deleteButton: {
            backgroundColor: '#F19292',
            borderRadius: theme.spacing.smallMedium / 2,
            padding: theme.spacing.small
        },
        habitDataText: {
            marginTop: 0,
            marginBottom: 0,
        },
        datesContainer: {
            paddingHorizontal: theme.spacing.smallMedium,
            maxHeight: '50%',
        },
        dateContainer: {
            alignItems: 'center',
            width: theme.spacing.extraLarge,
            paddingHorizontal: 0,
            margin: 0
        },
        dateHeader: {
            backgroundColor: theme.colors.primary,
            margin: 0,
            color: theme.colors.background,
            textAlign: 'center',
            borderWidth: 1,
            borderColor: theme.colors.background,
            minWidth: '100%',
            maxWidth: '100%',
        },
        dateContent: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.background,
            minWidth: '100%',
            maxWidth: '100%',
        },
        coloredCircle: {
            width: theme.spacing.medium,
            height: theme.spacing.medium,
            borderRadius: theme.spacing.medium / 2,
            backgroundColor: theme.colors.primary,
        },
        container: {
            backgroundColor: theme.colors.background,
            height: '100%',
        },
        colorPickerContainer: {
            padding: theme.spacing.medium,
        },
        colorPickerCircleContainer: {
            padding: theme.spacing.medium,
            paddintTop: theme.spacing.extraLarge,
            alignItems: 'center',
            justifyContent: 'center',
        },
        colorPickerBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: "20%",
            marginTop: "20%",
            width: '60%',
            height: '60%',
        },
        colorText: {
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: theme.spacing.medium,
        }
    });
    return styles;
};