import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/texts.styles';

interface GQLErrorProps {
    message: string
}

export const SucessMessage: React.FC<GQLErrorProps> = ({ message }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.sucessText}>
            <Text style={styles.sucessText}>{message}</Text>

        </View>
    );
};