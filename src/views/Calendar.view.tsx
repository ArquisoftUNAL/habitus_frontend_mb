import React, { memo, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLazyQuery, useQuery } from '@apollo/client';
import PieChart from 'react-native-pie-chart';

import { createStyles as calendarStylesBuilder } from '../styles/calendar.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { Spacing } from '../components/Spacing';
import { ComboBoxInput } from '../components/inputs';
import { GraphQLError } from '../components/GraphQLError';
import { SinglePieChart } from '../components/SinglePieChart';


const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November',
    'December'
];


interface BuildCalendarHeadersProps {
    styles: any
}

// Build calendar header
const BuildCalendarHeader = ({ styles }: BuildCalendarHeadersProps): JSX.Element => {
    return (
        <View style={styles.rowContainer}>
            {
                weekDays.map((day, index) => {
                    return (
                        <View key={"w_h" + index} style={styles.headerCellContainer}>
                            <Text style={styles.headerCellContainerText}> {day} </Text>
                        </View>
                    );
                })
            }
        </View>
    );
}

interface BuildCalendarDaysProps {
    styles: any,
    start_date: any,
    end_date: any,
    calendarData: any,
    setSelectedDayData: any
}

const BuildCalendarDays = ({
    styles, start_date, end_date, calendarData, setSelectedDayData
}: BuildCalendarDaysProps): JSX.Element => {

    // Get day of week of start date
    const start_day = start_date.getDay();

    // Get total number of days
    const total_days = (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);

    // Get array of day numbers
    const days: number[] = [], weeks = [];

    // Fill offset days with -1
    for (let i = 0; i < start_day; i++) {
        days.push(-1);
    }

    for (let i = 0; i < total_days; i++) {
        days.push(i + 1);
    }

    // Fill remaining days with -1
    for (let i = 0; i < 7 - (total_days + start_day) % 7; i++) {
        days.push(-1);
    }

    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    // Data is already grouped by day
    return (
        <View>
            {weeks.map(
                (weekDays: any, weekIndex: number) => {
                    return (
                        <View style={styles.rowContainer} key={"w_" + weekIndex}>
                            {
                                weekDays.map((day: any, weeDayIndex: number) => {
                                    if (day == -1) {
                                        return (
                                            <View style={styles.cellContainer} key={"wc_" + weekIndex + "_d_" + weeDayIndex}>
                                                <View
                                                    key={"w_" + weekIndex + "_d_" + weeDayIndex}
                                                    style={styles.cell}>
                                                    <Text> </Text>
                                                </View>
                                            </View>
                                        );
                                    } else {
                                        const date = new Date(start_date.getFullYear(), start_date.getMonth(), day);
                                        const date_string = date.toISOString().split('T')[0];

                                        const matched_item = calendarData.find((item: any) => item.date == date_string);

                                        return (
                                            <View style={styles.cellContainer} key={"wc_" + weekIndex + "_d_" + weeDayIndex}>
                                                <View
                                                    key={"w_" + weekIndex + "_d_" + weeDayIndex}
                                                    style={styles.cell}>
                                                    <Text style={{
                                                        ...(
                                                            matched_item ?
                                                                styles.markedCellContainerText :
                                                                styles.commonCellContainerText
                                                        )
                                                    }}

                                                        onPress={() => { setSelectedDayData(matched_item); }}
                                                    >
                                                        {day}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                })
                            }
                        </View>
                    )
                }
            )}

        </View >
    )
}

interface SwitchProps {
    period: string,
    dates: any,
    setDates: any
}

const switchNext = ({ period, dates, setDates }: SwitchProps) => {
    switch (period) {
        case 'week':
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth(), dates[0].getDate() + 7),
                new Date(dates[1].getFullYear(), dates[1].getMonth(), dates[1].getDate() + 7)
            ]);
            break;
        case 'month':
        default:
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth() + 1, dates[0].getDate()),
                new Date(dates[1].getFullYear(), dates[1].getMonth() + 1, dates[1].getDate())
            ]);
            break;
    }
}

const switchPrevious = ({ period, dates, setDates }: SwitchProps) => {
    switch (period) {
        case 'week':
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth(), dates[0].getDate() - 7),
                new Date(dates[1].getFullYear(), dates[1].getMonth(), dates[1].getDate() - 7)
            ]);
            break;
        case 'month':
        default:
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth() - 1, dates[0].getDate()),
                new Date(dates[1].getFullYear(), dates[1].getMonth() - 1, dates[1].getDate())
            ]);
            break;
    }
}

interface CalendarDay {
    date: string,
    data: string,
    relative_frequency: number
}

export const CalendarView: React.FC = () => {

    const [period, setPeriod] = React.useState('month');
    const [selectedDayData, setSelectedDayData] = React.useState<CalendarDay | null>(null);
    const [habit, setHabit] = React.useState<any>(null);

    const { theme } = useTheme();
    const styles = {
        ...calendarStylesBuilder(theme),
        ...textStylesBuilder(theme)
    };

    const current_date = new Date();

    // Get start and end days of current month
    let start_date, end_date;

    switch (period) {
        case 'week':
            start_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay());
            end_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 6);
            break;
        case 'month':
        default:
            start_date = new Date(current_date.getFullYear(), current_date.getMonth(), 1);
            end_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0);
            break;
    }

    const [dates, setDates] = React.useState([start_date, end_date]);

    const { loading: habitsLoading, error: habitsError, data: habitsData } = useQuery(graphql.USER_HABITS);

    const [queryByUser, { data: queryByUserData, error: queryByUserError, loading: queryByUserLoading }] = useLazyQuery(
        graphql.CALENDAR_RESUMED_DATA
    )

    const [queryByHabit, { data: queryByHabitData, error: queryByHabitError, loading: queryByHabitLoading }] = useLazyQuery(
        graphql.CALENDAR_HABIT_RESUME_DATA
    );

    useEffect(() => {
        if (!habit) {
            queryByUser({
                variables: {
                    start_date: dates[0].toISOString().split('T')[0],
                    end_date: dates[1].toISOString().split('T')[0]
                }
            });
        }
        else {
            queryByHabit({
                variables: {
                    start_date: dates[0].toISOString().split('T')[0],
                    end_date: dates[1].toISOString().split('T')[0],
                    hab_id: habit.value
                }
            });
        }
    }, [habit]);

    if (habitsLoading) return <LoadingView />;

    if (habitsError) return <GraphQLError error={habitsError} />;

    let habits = [];

    if (habitsData?.habitsByUser) {
        // Build habits array
        habits = habitsData.habitsByUser.map((habit: any) => ({
            label: habit.hab_name,
            value: habit.hab_id,
        }));
    }

    const AllsOption = {
        label: "All",
        value: "all"
    }

    habits.push(AllsOption)

    if (queryByUserLoading) return <LoadingView />;
    if (queryByUserError) return <GraphQLError error={queryByUserError} />;
    if (queryByHabitLoading) return <LoadingView />;
    if (queryByHabitError) return <GraphQLError error={queryByHabitError} />;

    const calendarData = habit ? queryByHabitData?.calendarEventsByHabit : queryByUserData?.calendarEventsByUser;

    // Build data for pie chart
    const pieChartData = selectedDayData ? [
        {
            text: "Ocurrences",
            value: selectedDayData.relative_frequency,
            color: theme.colors.primary
        },
        {
            text: "Remaining",
            value: 1 - selectedDayData.relative_frequency,
            color: theme.colors.tertiary
        }
    ] : [];


    return (
        <View style={styles.container}>
            <Text style={styles.mediumText}>
                {period == 'month' ? 'Monthly' : 'Weekly'} Calendar
            </Text>
            <ComboBoxInput
                items={habits}
                onChange={(item: any) => {
                    if (item.value == "all") {
                        setHabit(null);
                    } else {
                        setHabit(item);
                    }
                }}
                value={habit || AllsOption}
            />
            <ScrollView>
                <View style={styles.buttonsRow}>
                    <Pressable
                        style={styles.navigatorButton}
                        onPress={() => {
                            switchPrevious({ period, dates, setDates });
                        }}>
                        <Text style={styles.navigationButtonText}>
                            {"Previous"}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.navigatorButton}
                        onPress={() => {
                            switchNext({ period, dates, setDates });
                        }}>
                        <Text style={styles.navigationButtonText}>
                            {"Next"}
                        </Text>
                    </Pressable>
                </View>
                <Text style={styles.largeText}>
                    {months[dates[0].getMonth()]} - {dates[0].getFullYear()}
                </Text>
                <BuildCalendarHeader styles={styles} />
                {
                    calendarData &&
                    <BuildCalendarDays
                        styles={styles}
                        start_date={dates[0]}
                        end_date={dates[1]}
                        calendarData={calendarData}
                        setSelectedDayData={setSelectedDayData}
                    />
                }

                {
                    selectedDayData ?
                        <View style={styles.selectedDayContainer}>
                            <Text style={styles.selectedDayTextTitle}>
                                Chosen date:
                            </Text>
                            <Text style={styles.selectedDayText}>
                                {selectedDayData.date}
                            </Text>
                            <Spacing size={20} />
                            <Text style={styles.selectedDayTextTitle}>
                                Amount for that day:
                            </Text>
                            <Text style={styles.selectedDayText}>
                                {selectedDayData.data}
                            </Text>
                            <Spacing size={20} />
                            <Text style={styles.selectedDayTextTitle}>
                                Relative frequency (based on month)
                            </Text>
                            <SinglePieChart
                                data={pieChartData}
                            />
                        </View>
                        :
                        <View>
                            <Text style={styles.selectedDayTextTitle}>
                                No day selected
                            </Text>
                        </View>
                }
            </ScrollView>
        </View >
    );
};