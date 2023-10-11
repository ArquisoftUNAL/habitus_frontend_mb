import React from 'react';
import { View, Pressable, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/separator.styles';

export const Separator: React.FC = () => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.separatorContainer}>
            <View style={styles.separator} />
        </View>
    );
};