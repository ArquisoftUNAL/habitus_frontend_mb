import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/texts.styles';

interface TextProps {
    title: string;
}

export const PageTitle: React.FC<TextProps> = ({ title }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View>
            <Text style={styles.pageTitle}>
                {title}
            </Text>
        </View>
    );
};

export const Label: React.FC<TextProps> = ({ title }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View>
            <Text style={styles.inputLabel}>
                {title}
            </Text>
        </View>
    );
}