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
    const textStyle = type === 'primary' ? styles.primaryText : styles.secondaryText;

    return (
        <View style={{
            alignItems: 'center',
        }}>
            <Pressable
                style={buttonStyle}
                onPress={action}
            >
                <Text style={textStyle}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};