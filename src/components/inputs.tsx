import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/inputs.styles';
import { TextInput } from 'react-native-gesture-handler';

interface InputProps {
    title: string;
    masked?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export const TextFieldInput: React.FC<InputProps> = ({ title, masked, onChange, value }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View>
            <TextInput
                style={styles.largeTextInput}
                placeholder={title}
                secureTextEntry={masked}
                onChangeText={onChange}
                value={value}
            />
        </View>
    );
};