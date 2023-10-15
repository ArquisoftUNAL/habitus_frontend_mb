import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/texts.styles';

import { ApolloError } from '@apollo/client';

interface ValidationErrorProps {
    error: string
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ error }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.errorText}>
            <Text style={styles.smallText}>
                Check your input data
            </Text>
            {
                error.length > 0 && (
                    <Text style={styles.smallText}>
                        {error}
                    </Text>
                )
            }


        </View>
    );
};