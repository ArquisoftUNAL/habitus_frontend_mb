import React from 'react';
import { View, Text } from 'react-native';

interface CalendarDayProps {
    day: number;
    month: number;
    year: number;
}

export function CalendarDay(props: CalendarDayProps): JSX.Element {
    const { day, month, year } = props;
    const date = new Date(year, month, day);

    return (
        <View>
            <Text>{date.toLocaleDateString()}</Text>
        </View>
    )
}