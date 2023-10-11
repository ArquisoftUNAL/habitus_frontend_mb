import React from 'react';
import { Text, View } from 'react-native';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CommonActions } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';

import graphql from '../graphql';
import { Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles as habitsViewStylesBuilder } from '../styles/habits.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { TextFieldInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { CustomButton } from '../components/Button';
import { getAuthToken, setAuthToken } from '../storage/authToken';
import { ScrollView } from 'react-native-gesture-handler';
import { GraphQLError } from '../components/GraphQLError';
import { LoadingView } from './LoadingView';


interface HabitsViewProps {
    navigation: any;
};

const PAGE_LIMIT = 1000;
const DAYS_OFFSET = 30;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const HabitsView = React.memo<HabitsViewProps>(({ navigation }) => {

    const { theme } = useTheme();
    const styles = {
        ...habitsViewStylesBuilder(theme),
        ...textStylesBuilder(theme),
    };

    // Expandable habits
    const [selected, setSelected] = React.useState<any[]>([]);

    const endDate = new Date();
    const startDate = (new Date(endDate)).setDate(endDate.getDate() - DAYS_OFFSET);

    const endDateOnly = endDate.toISOString().split('T')[0];
    const startDateOnly = new Date(startDate).toISOString().split('T')[0];

    const [launchHabitsQuery, { loading, error, data }] = useLazyQuery(
        graphql.USER_HABITS_FULL_DATA, {
        variables: {
            habits_page: 1,
            habits_per_page: PAGE_LIMIT,
            categories_page: 1,
            categories_per_page: PAGE_LIMIT,
            habits_data_page: 1,
            habits_data_per_page: PAGE_LIMIT,
            start_date: startDateOnly,
            end_date: endDateOnly,
        }
    });

    React.useEffect(() => {
        // Launch query always on init and on data change
        launchHabitsQuery();
    }, []);

    if (error) {
        return <GraphQLError error={error} />
    }

    if (loading || !data) {
        return <LoadingView />
    }

    // Cache data to make it easier to use later while rendering
    let categories: any = {};
    let habits: any = {};
    let habitData: any = {};

    data.categories.forEach((category: any) => {
        categories[category.cat_id] = category;
    });

    data.habitsByUser.forEach((habit: any) => {
        habits[habit.hab_id] = habit;
    });

    data.habitdataByUser.forEach((data: any) => {
        habitData[data.hab_dat_id] = data;
    });

    // Build sections
    const sections = Object.keys(habits).map((habitId: string) => {
        const habit = habits[habitId];
        const data = Object.keys(habitData).filter((key: string) => {
            const habitDataItem = habitData[key];
            return habitDataItem.hab_id === habitId;
        });
        const category = categories[habit.cat_id];
        return {
            habit: habit,
            data: data,
            category: category,
        }
    });

    // Render section title
    const renderSectionTitle = (section: any) => {
        return (
            <View>
                <Text>
                    {section.habit.hab_name} in Category {section.category.cat_name}
                </Text>
            </View>
        );
    };

    // Render section content
    const renderContent = (section: any) => {
        return (
            <View>
                <ScrollView>
                    {
                        section.data.map((dataId: string) => {
                            const dataItem = habitData[dataId];
                            return (
                                <View key={dataId}>
                                    <Text>
                                        {dataItem.hab_dat_collected_at}
                                        {dataItem.hab_dat_amount}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    };

    // Update sections
    const updateSections = (activeSections: any) => {
        setSelected(activeSections);
    };

    return (
        <View>
            <Text style={styles.largeText}>
                Habits
            </Text>

            <Spacing size={20} />

            <CustomButton
                title="Add habit"
                type="primary"
                action={() => {
                    navigation.navigate('AddHabit');
                }}
            />

            <Spacing size={20} />

            <ScrollView>
                <Accordion
                    sections={sections}
                    activeSections={selected}
                    renderSectionTitle={() => (<></>)}
                    renderHeader={renderSectionTitle}
                    renderContent={renderContent}
                    onChange={updateSections}
                    containerStyle={styles.accordeonStyle}
                    sectionContainerStyle={styles.accordeonHeader}
                    underlayColor={"transparent"}
                    align="center"
                    duration={100}
                    expandMultiple={true}
                />
            </ScrollView>
        </View>


    );
})