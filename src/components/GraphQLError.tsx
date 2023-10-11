import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/texts.styles';

import { ApolloError } from '@apollo/client';

interface GQLErrorProps {
    error: ApolloError
}

export const GraphQLError: React.FC<GQLErrorProps> = ({ error }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.errorText}>
            <Text style={styles.smallText}>
                Ooops.. Something went wrong while fetching data
            </Text>
            <Text style={styles.smallText}>
                Error: {error.message}
            </Text>
            {
                error.graphQLErrors?.length > 0 && (
                    <Text style={styles.smallText}>
                        Query errors: {error.graphQLErrors.map((err) => err.message).join(' ')}
                    </Text>
                )
            }
            {
                error.clientErrors?.length > 0 && (
                    <Text style={styles.smallText}>
                        Client errors: {error.clientErrors.join(' ')}
                    </Text>
                )
            }

        </View>
    );
};