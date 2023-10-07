import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import { createStyles } from './../styles/calendar.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';

export const CalendarView = (): JSX.Element => {

    const [period, setPeriod] = React.useState('month');

    const current_date = new Date();

    // Get start and end days of current month
    let start_day, end_day, row_limit;

    switch (period) {
        case 'month':
            start_day = new Date(current_date.getFullYear(), current_date.getMonth(), 1);
            end_day = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0);
            break;
        case 'week':
            start_day = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay());
            end_day = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 6);
            break;
    }

    const { data, error, loading } = useQuery(
        graphql.CALENDAR_HABITSDATA,
        {
            variables: {
                start_day: start_day,
                end_day: end_day
            }
        }
    )

    if (error) return (<Text>
        {error.message}
        {error.graphQLErrors.map(({ message }, i) => (
            message + "\n"
        ))}
        Error! {error.clientErrors.join(' ')}
    </Text>);

    if (loading) return (
        <LoadingView />
    );

    console.log(data);

    const { habitsDataByUser: habitsdata, habitsByUser: habits } = data;

    return (
        <View>

        </View>
    );
};