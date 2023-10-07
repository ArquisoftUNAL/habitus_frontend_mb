import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from './../styles/loading.styles';

export const LoadingView = (): JSX.Element => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.mainLoadingContainer}>
            <Text style={styles.mainLoadingText}>
                Your content is being loaded!
            </Text>
        </View>
    );
}