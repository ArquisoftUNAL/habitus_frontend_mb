import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native'

interface SpacingProps {
    size: number;
}

const style = (size: number) => {
    const styles = StyleSheet.create({
        spacing: {
            marginTop: size,
            marginLeft: size,
        }
    });
    return styles.spacing;
}

export const Spacing: React.FC<SpacingProps> = ({ size }) => {

    return (
        <View style={style(size)} />
    );
};