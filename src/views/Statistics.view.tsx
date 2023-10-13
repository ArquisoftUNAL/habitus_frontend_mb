import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';

import { createStyles as notificationsStylesBuilder } from './../styles/notifications.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { createStyles as containerStylesBuilder } from '../styles/container.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { GraphQLError } from '../components/GraphQLError';
import { ComboBoxInput } from '../components/inputs';
import { Separator } from '../components/Separator';

export const StatisticsView = React.memo(() => {

    const { theme } = useTheme();
    const styles = {
        ...notificationsStylesBuilder(theme),
        ...textStylesBuilder(theme),
        ...containerStylesBuilder(theme),
    }

    const [habit, setHabit] = React.useState<any>(null);

    // Get habits to choose where to take statistics from
    const { loading: habitsLoading, error: habitsError, data: habitsData } = useQuery(graphql.USER_HABITS);

    const [
        getHabitStatistics,
        { loading: statisticsLoading, error: statisticsError, data: statisticsData }
    ] = useLazyQuery(
        graphql.GET_HABIT_STATISTICS
    );

    console.log(JSON.stringify(statisticsError));
    let habits = [];

    if (habitsData?.habitsByUser) {
        // Build habits array
        habits = habitsData.habitsByUser.map((habit: any) => ({
            label: habit.hab_name,
            value: habit.hab_id,
        }));
    }

    if (habitsLoading) return <LoadingView />;

    if (habitsError) return <GraphQLError error={habitsError} />;

    return (
        <View style={styles.fullPage}>
            <Text style={styles.largeText}>
                Statistics
            </Text>
            <ComboBoxInput
                items={habits}
                onChange={(item: any) => {
                    setHabit(item);
                    getHabitStatistics({ variables: { hab_id: item.value } });
                }}
                value={habit}
            />
            <View>
                <Text>
                    {
                        statisticsLoading
                            ? <LoadingView />
                            : statisticsError
                                ? <GraphQLError error={statisticsError} />
                                : "Statistics loaded!"
                    }
                    {JSON.stringify(statisticsData)}
                </Text>
            </View>
        </View >
    );
});