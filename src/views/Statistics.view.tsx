import React, { memo, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';

import { createStyles as statisticsStylesBuilder } from './../styles/statistics.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { createStyles as containerStylesBuilder } from '../styles/container.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { GraphQLError } from '../components/GraphQLError';
import { ComboBoxInput } from '../components/inputs';
import { Separator } from '../components/Separator';
import { SinglePieChart } from '../components/SinglePieChart';
import { Spacing } from '../components/Spacing';

interface StatisticsProps {
    habit: any;
    data: any;
    styles: any;
    theme: any;
}
const HISTORY_DAYS_LIMIT = 30;
const HISTORY_WEEKS_LIMIT = 4;
const HISTORY_MONTHS_LIMIT = 6;
const HISTORY_SEMESTERS_LIMIT = 2;
const HISTORY_YEARS_LIMIT = 1;

const HISTORY_STREAKS_LIMIT = 5;
const HISTORY_LAST_DAYS_LIMIT = 5;


const RenderMeasurableHabitStatistics: React.FC<StatisticsProps> = ({ habit, data, styles, theme }) => {
    const report = data.habitMeasureReport;

    if (!report.resume || !report.history || !report.streaks || !report.days_frequency) return null;

    // Calculate maximum streak
    let maxStreak = 0;
    report.streaks.data.forEach((streak: any) => {
        maxStreak = Math.max(maxStreak, streak.quantity);
    });

    return (
        <View>
            <Text style={styles.mediumLargeText}>
                Measurable Habit
            </Text>
            <Text style={styles.mediumText}>
                Resume
            </Text>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={styles.smallText}>
                    Progress to present day:
                </Text>
                {
                    report.resume.toDay &&
                    <SinglePieChart
                        data={[
                            {
                                text: "Progress in month",
                                value: report.resume.toDay.percentage,
                                color: theme.colors.primary
                            },
                            {
                                text: "Remaining",
                                value: 1 - report.resume.toDay.percentage,
                                color: theme.colors.tertiary
                            }
                        ]}
                        showText={true}
                        customCenterText={report.resume.toDay.percentage.toFixed(2) * 100 + "%"}

                        internalRadius={40}
                        externalRadius={50}
                    />
                }
            </View>
            <View style={styles.measurableResumeContainer}>

                <View style={styles.measurableResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this week:
                    </Text>
                    {
                        report.resume.week &&
                        <SinglePieChart
                            data={[
                                {
                                    text: "Progress in month",
                                    value: report.resume.week.percentage,
                                    color: theme.colors.primary
                                },
                                {
                                    text: "Remaining",
                                    value: 1 - report.resume.week.percentage,
                                    color: theme.colors.tertiary
                                }
                            ]}
                            showText={true}
                            customCenterText={report.resume.week.percentage.toFixed(2) * 100 + "%"}

                            internalRadius={40}
                            externalRadius={50}
                        />
                    }
                </View>
                <View style={styles.measurableResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this month:
                    </Text>
                    {
                        report.resume.month &&
                        <SinglePieChart
                            data={[
                                {
                                    text: "Progress in month",
                                    value: report.resume.month.percentage,
                                    color: theme.colors.primary
                                },
                                {
                                    text: "Remaining",
                                    value: 1 - report.resume.month.percentage,
                                    color: theme.colors.tertiary
                                }
                            ]}
                            showText={true}
                            customCenterText={report.resume.month.percentage.toFixed(2) * 100 + "%"}

                            internalRadius={40}
                            externalRadius={50}
                        />
                    }
                </View>
                <View style={styles.measurableResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this semester:
                    </Text>
                    {
                        report.resume.semester &&
                        <SinglePieChart
                            data={[
                                {
                                    text: "Progress in month",
                                    value: report.resume.semester.percentage,
                                    color: theme.colors.primary
                                },
                                {
                                    text: "Remaining",
                                    value: 1 - report.resume.semester.percentage,
                                    color: theme.colors.tertiary
                                }
                            ]}
                            showText={true}
                            customCenterText={report.resume.semester.percentage.toFixed(2) * 100 + "%"}

                            internalRadius={40}
                            externalRadius={50}
                        />
                    }
                </View>
                <View style={styles.measurableResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this year:
                    </Text>
                    {
                        report.resume.year &&
                        <SinglePieChart
                            data={[
                                {
                                    text: "Progress in month",
                                    value: report.resume.year.percentage,
                                    color: theme.colors.primary
                                },
                                {
                                    text: "Remaining",
                                    value: 1 - report.resume.year.percentage,
                                    color: theme.colors.tertiary
                                }
                            ]}
                            showText={true}
                            customCenterText={report.resume.year.percentage.toFixed(2) * 100 + "%"}

                            internalRadius={40}
                            externalRadius={50}
                        />
                    }
                </View>


            </View>
            <Text style={styles.mediumText}>
                History
            </Text>
            <View style={styles.historyItemContainer}>
                <Text style={styles.smallMediumText}>
                    Daily
                </Text>
                {
                    report.history.day?.data.map((data: any, index: number) => {
                        if (index > HISTORY_DAYS_LIMIT) return null;
                        return (
                            <View key={index}>
                                <Text style={styles.smallText}>
                                    📆 #{data.day} - {data.year} {`(${data.value}) ${habit.units}`}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={styles.historyContainer}>

                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Weekly
                    </Text>
                    {
                        report.history.week?.data.map((data: any, index: number) => {
                            if (index > HISTORY_DAYS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 #{data.week} - {data.year} {`(${data.value}) ${habit.units}`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Monthly
                    </Text>
                    {
                        report.history.month?.data.map((data: any, index: number) => {
                            if (index > HISTORY_MONTHS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 {data.year}/{data.month} {`(${data.value}) ${habit.units}`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Semester
                    </Text>
                    {
                        report.history.semester?.data.map((data: any, index: number) => {
                            if (index > HISTORY_SEMESTERS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 Semester #{data.semester} - {data.year} {`(${data.value}) ${habit.units}`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Year
                    </Text>
                    {
                        report.history.year?.data.map((data: any, index: number) => {
                            if (index > HISTORY_YEARS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 {data.year} {`(${data.value}) ${habit.units}`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>

            <Text style={styles.mediumText}>
                Streaks
            </Text>
            {
                report.streaks.data.map((streak: any, index: number) => {

                    if (index > HISTORY_STREAKS_LIMIT) return null;

                    const date_start = new Date(streak.start_date);
                    const date_end = new Date(streak.end_date);

                    const percentage = (streak.quantity / maxStreak) * 100;
                    return (
                        <View key={index} style={styles.streaksContainer}>
                            <Text style={styles.smallText}>
                                {date_start.toDateString()} - {date_end.toDateString()}
                            </Text>
                            <View
                                style={{
                                    backgroundColor: (index % 2 == 0) ? theme.colors.primary : theme.colors.tertiary,
                                    width: `${percentage}%`,
                                    height: 10,
                                    borderRadius: 10
                                }}
                            />
                        </View>
                    )
                })
            }
            <Spacing size={20} />
            <Text style={styles.mediumText}>
                Last Days you performed this habit
            </Text>
            {
                report.days_frequency.data.map((frequency: any, index: number) => {

                    if (index > HISTORY_LAST_DAYS_LIMIT) return null;

                    const date = new Date(frequency.year, frequency.month - 1, frequency.week_day);
                    return (
                        <View key={index}>
                            <Text style={styles.smallText}>
                                ✅   {date.toDateString()} with {frequency.quantity} {habit.units}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const RenderYnHabitStatistics: React.FC<StatisticsProps> = ({ habit, data, styles, theme }) => {
    const report = data.habitYnReport;

    if (!report.resume || !report.history || !report.streaks || !report.days_frequency) return null;

    // Calculate maximum streak
    let maxStreak = 0;
    report.streaks.data.forEach((streak: any) => {
        maxStreak = Math.max(maxStreak, streak.quantity);
    });

    return (
        <View>
            <Text style={styles.mediumLargeText}>
                Yes/No Habit
            </Text>
            <Text style={styles.mediumText}>
                Resume
            </Text>
            <View style={styles.ynResumeContainer}>
                <View style={styles.ynResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this month:
                    </Text>
                    <Spacing size={20} />
                    <SinglePieChart
                        data={[
                            { text: "Progress in month", value: report.resume.month, color: "#002B99" },
                            { text: "Remaining", value: 1 - report.resume.month, color: theme.colors.tertiary },
                        ]}
                        showText={false}

                        internalRadius={10}
                        externalRadius={20}
                    />
                </View>
                <View style={styles.ynResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this semester:
                    </Text>
                    <Spacing size={20} />
                    <SinglePieChart
                        data={[
                            { text: "Progress in semester", value: report.resume.semester, color: "#002B99" },
                            { text: "Remaining", value: 1 - report.resume.semester, color: theme.colors.tertiary },
                        ]}
                        showText={false}

                        internalRadius={10}
                        externalRadius={20}
                    />
                </View>
                <View style={styles.ynResumeItemContainer}>
                    <Text style={styles.smallText}>
                        Progress in this year:
                    </Text>
                    <Spacing size={20} />
                    <SinglePieChart
                        data={[
                            { text: "Progress in year", value: report.resume.year, color: "#002B99" },
                            { text: "Remaining", value: 1 - report.resume.year, color: theme.colors.tertiary },
                        ]}
                        showText={false}
                        internalRadius={10}
                        externalRadius={20}
                    />
                </View>

            </View>
            <View>
                <Text style={styles.smallText}>
                    Number of days you have done this habit: {report.resume.total}
                </Text>
            </View>
            <Text style={styles.mediumText}>
                History
            </Text>
            <View style={styles.historyContainer}>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Weekly
                    </Text>
                    {
                        report.history.week.data.map((data: any, index: number) => {
                            if (index > HISTORY_WEEKS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 #{data.week} - {data.year} {`(${data.count}) ocurrences`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Monthly
                    </Text>
                    {
                        report.history.month.data.map((data: any, index: number) => {
                            if (index > HISTORY_MONTHS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 {data.year}/{data.month} {`(${data.count}) ocurrences`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Semester
                    </Text>
                    {
                        report.history.semester.data.map((data: any, index: number) => {
                            if (index > HISTORY_SEMESTERS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 Semester #{data.semester} - {data.year} {`(${data.count}) ocurrences`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.historyItemContainer}>
                    <Text style={styles.smallMediumText}>
                        Year
                    </Text>
                    {
                        report.history.year.data.map((data: any, index: number) => {
                            if (index > HISTORY_YEARS_LIMIT) return null;
                            return (
                                <View key={index}>
                                    <Text style={styles.smallText}>
                                        📆 {data.year} {`(${data.count}) ocurrences`}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <Text style={styles.mediumText}>
                Streaks
            </Text>
            {
                report.streaks.data.map((streak: any, index: number) => {

                    if (index > HISTORY_STREAKS_LIMIT) return null;

                    const date_start = new Date(streak.start_date);
                    const date_end = new Date(streak.end_date);

                    const percentage = (streak.quantity / maxStreak) * 100;
                    return (
                        <View key={index} style={styles.streaksContainer}>
                            <Text style={styles.smallText}>
                                {date_start.toDateString()} - {date_end.toDateString()}
                            </Text>
                            <View
                                style={{
                                    backgroundColor: (index % 2 == 0) ? theme.colors.primary : theme.colors.tertiary,
                                    width: `${percentage}%`,
                                    height: 10,
                                    borderRadius: 10
                                }}
                            />
                        </View>
                    )
                })
            }
            <Spacing size={20} />
            <Text style={styles.mediumText}>
                Last Days you performed this habit
            </Text>
            {
                report.days_frequency.data.map((frequency: any, index: number) => {

                    if (index > HISTORY_LAST_DAYS_LIMIT) return null;

                    const date = new Date(frequency.year, frequency.month - 1, frequency.week_day);
                    return (
                        <View key={index}>
                            <Text style={styles.smallText}>
                                ✅   {date.toDateString()}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export const StatisticsView: React.FC = () => {

    const { theme } = useTheme();
    const styles = {
        ...statisticsStylesBuilder(theme),
        ...textStylesBuilder(theme),
        ...containerStylesBuilder(theme),
    }

    const [habit, setHabit] = React.useState<any>(null);

    // Get habits to choose where to take statistics from
    const { loading: habitsLoading, error: habitsError, data: habitsData } = useQuery(graphql.USER_HABITS);

    // Get statistics
    const [
        getMeasureHabitStatistics,
        { loading: measureStatisticsLoading, error: measureStatisticsError, data: measureStatisticsData }
    ] = useLazyQuery(
        graphql.GET_MEASURE_HABIT_STATISTICS
    );

    const [
        getYnHabitStatistics,
        { loading: ynStatisticsLoading, error: ynStatisticsError, data: ynStatisticsData }
    ] = useLazyQuery(
        graphql.GET_YN_HABIT_STATISTICS
    );

    useEffect(() => {
        if (habit)
            if (habit.is_yn)
                getYnHabitStatistics({ variables: { id: habit.value } });
            else
                getMeasureHabitStatistics({ variables: { id: habit.value } });

    }, [habit]);

    if (habitsLoading) return <LoadingView />;

    if (habitsError) return <GraphQLError error={habitsError} />;

    let habits = [];

    if (habitsData?.habitsByUser) {
        // Build habits array
        habits = habitsData.habitsByUser.map((habit: any) => {
            return {
                label: habit.hab_name,
                is_yn: habit.hab_is_yn,
                units: habit.hab_units,
                value: habit.hab_id,
            }
        });
    }

    const Statistics = () => {
        if (!habit) return <Text style={styles.mediumText}> No habit chosen yet! </Text>;

        let isLoading = measureStatisticsLoading || ynStatisticsLoading;
        isLoading ||= (habit && !(habit.is_yn ? ynStatisticsData : measureStatisticsData));
        if (isLoading) return <LoadingView />;
        if (measureStatisticsError) return <GraphQLError error={measureStatisticsError} />;
        if (ynStatisticsError) return <GraphQLError error={ynStatisticsError} />;

        if (habit.is_yn)
            return <RenderYnHabitStatistics
                habit={habit} data={ynStatisticsData}
                styles={styles} theme={theme}
            />
        else
            return <RenderMeasurableHabitStatistics
                habit={habit} data={measureStatisticsData}
                styles={styles} theme={theme}
            />
    }

    return (
        <View style={styles.fullPage}>
            <ScrollView>
                <Text style={styles.largeText}>
                    Statistics
                </Text>
                <Text style={styles.mediumText}>
                    Lets start choosing an habit
                </Text>
                <ComboBoxInput
                    items={habits}
                    onChange={(item: any) => {
                        setHabit(item);
                    }}
                    value={habit}
                />
                <Separator />
                <Statistics />
            </ScrollView>
        </View >
    );
};