import React from 'react';
import { Icon } from '@rneui/themed';

interface IconFunctionProps {
    name: string;
}

interface IconProps {
    color: string;
    name: string;
    size: number;
}

interface IconComponentProps {
    color: string;
    focused: boolean;
    size: number;
}

export const IconComponent: React.FC<IconProps> = ({ color, name, size }) => {
    return (
        <Icon name={name} color={color} size={size} />
    );
}

export const IconComponentAsFunction = ({ name }: IconFunctionProps) => {
    return (
        ({ color, focused, size }: IconComponentProps) => {
            return < IconComponent name={name} color={color} size={size} />
        }
    );
}