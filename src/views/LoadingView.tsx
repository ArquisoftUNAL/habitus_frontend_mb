import React from 'react';
import { Text, View, Image } from 'react-native';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/loading.view.styles';

const LoadingGIF = require('./../assets/images/Loading.gif');

export const LoadingView = (): JSX.Element => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.mainLoadingContainer}>
            <Image source={LoadingGIF} style={styles.imageContainer} />
            <Text style={styles.mainLoadingText}>Loading...</Text>
        </View>
    );
}