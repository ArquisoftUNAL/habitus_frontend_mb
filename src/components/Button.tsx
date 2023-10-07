import React from 'react';
import { View, Pressable, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/button.styles';

interface ButtonProps {
    title: string;
    type: string;
    action: () => void;
}

export const CustomButton: React.FC<ButtonProps> = ({ title, type, action }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const buttonStyle = type === 'primary' ? styles.primary : styles.secondary;

    return (
        <View>
            <Pressable
                style={buttonStyle}
                onPress={action}
            >
                <Text style={styles.buttonLabel}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};