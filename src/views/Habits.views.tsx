import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CommonActions } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import { useToast } from "react-native-toast-notifications";

import graphql from '../graphql';
import { Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles as habitsViewStylesBuilder } from '../styles/habits.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { createStyles as containerStylesBuilder } from '../styles/container.styles';
import { SmallTextFieldInput, CheckBoxInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { CustomButton } from '../components/Button';
import { getAuthToken, setAuthToken } from '../storage/authToken';
import { ScrollView } from 'react-native-gesture-handler';
import { GraphQLError } from '../components/GraphQLError';
import { LoadingView } from './LoadingView';
import { Separator, SmallSeparator } from '../components/Separator';
import { CreateUpdateHabitView } from './CreateUpdateHabit.view';

interface HabitsViewProps {
    navigation: any;
};

const PAGE_LIMIT = 1000;
const DAYS_OFFSET = 7;
const ALLOWED_BACKDAYS = 1;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const HabitsView = React.memo<HabitsViewProps>(({ navigation }) => {

    const { theme } = useTheme();
    const toast = useToast();

    const styles = {
        ...habitsViewStylesBuilder(theme),
        ...textStylesBuilder(theme),
        ...containerStylesBuilder(theme),
    };

    // Expandable habits
    const [selected, setSelected] = React.useState<any[]>([]);
    const [modalHabitState, setModalHabitState] = React.useState<any>({
        visible: false,
        type: "create",
        habit: null,
    });

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

    const [performHabitDeletion, { error: habitDeletionError }] = useMutation(graphql.DELETE_HABIT);
    if (habitDeletionError) {
        console.log(JSON.stringify(habitDeletionError));
        toast.show("Error deleting habit", {
            type: "danger",
        });
    }

    const [performHabitdataUpdate, { error: habitdataUpdateError }] = useMutation(graphql.UPDATE_HABIT_DATA);
    if (habitdataUpdateError) toast.show("Error updating habit data", {
        type: "danger",
    });

    const [createHabitdata, { error: habitdataCreateError }] = useMutation(graphql.ADD_HABIT_DATA);
    if (habitdataCreateError) {
        console.log(JSON.stringify(habitdataCreateError));
    }

    const [deleteHabitdata, { error: habitdataDeleteError }] = useMutation(graphql.DELETE_HABIT_DATA);
    if (habitdataDeleteError) toast.show("Error updating habit data", {
        type: "danger",
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

    // Generate dates to be rendered
    const dates: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < DAYS_OFFSET; i++) {
        const currentDateString = currentDate.toISOString().split('T')[0];
        dates.push(currentDateString);

        currentDate.setDate(currentDate.getDate() - 1);
    }

    // Build sections
    const sections = Object.keys(habits).map((habitId: string) => {
        const habit = habits[habitId];
        const data = Object.values(habitData).filter((item: any) => {
            return item.hab_id === habitId;
        });
        const category = categories[habit.cat_id];
        return {
            habit: habit,
            data: data,
            category: category,
        }
    });

    // Render section title
    const RenderSectionTitle = (section: any) => {
        // Check habit color
        const regex = /([0-9A-F]{6})/i;

        const matches = regex.exec(section.habit.hab_color);

        let color = theme.colors.primary;

        if (matches) {
            color = "#" + matches[0];
        }

        return (
            <View style={styles.accordionHeader}>
                <View style={styles.accordionHeaderItem}>
                    <View style={[
                        styles.coloredCircle,
                        { backgroundColor: color }
                    ]} />
                </View>
                <View style={styles.accordionHeaderItem}>
                    <Text style={[
                        styles.accordionHeaderText
                    ]}>
                        {(section.habit.hab_is_favorite ? "⭐" : "") + " " + section.habit.hab_name}
                    </Text>
                </View>
                <View style={styles.accordionHeaderItem}>
                    <Pressable
                        onPress={() => {
                            setModalHabitState({
                                visible: true,
                                type: "edit",
                                habit: section.habit,
                            });
                        }}
                    >
                        <Text style={[
                            styles.accordionHeaderText,
                            styles.editButton
                        ]}>
                            Update
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.accordionHeaderItem}>
                    <Pressable
                        onPress={() => {
                            performHabitDeletion({
                                variables: {
                                    id: section.habit.hab_id,
                                }
                            })
                        }}
                    >
                        <Text style={[
                            styles.accordionHeaderText,
                            styles.deleteButton
                        ]}>
                            Delete
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    const RenderDay = (section: any, date: string, index: number) => {
        const dataItem = section.data.find(
            (dataItem: any) => dataItem.hab_dat_collected_at === date
        )

        const weekDay = days[new Date(date).getDay()];

        return (
            <View
                style={styles.dateContainer}
            >
                <Text style={styles.dateHeader}>
                    {weekDay}
                </Text>
                <View style={styles.dateContent}>
                    {
                        section.habit.hab_is_yn ?
                            <CheckBoxInput
                                enabled={index < ALLOWED_BACKDAYS}
                                onChange={(new_value) => {
                                    console.log(new_value, dataItem)
                                    if (new_value && dataItem) {
                                        // Since this is a YN habit, we need to delete the data
                                        deleteHabitdata({
                                            variables: {
                                                datId: dataItem.hab_dat_id
                                            },
                                            onCompleted: (data) => {
                                                toast.show(
                                                    "Habit data deleted",
                                                    {
                                                        type: "success",
                                                    }
                                                )
                                                section.data = section.data.filter(
                                                    (dataItem: any) => dataItem.hab_dat_id !== data.deleteHabitdata.hab_dat_id
                                                );
                                            },
                                            onError: (error) => {
                                                toast.show(
                                                    "Error deleting habit data: " + error.message,
                                                    {
                                                        type: "danger",
                                                    }
                                                );
                                            }
                                        });
                                    } else {
                                        // Since this is a YN habit, we need to create the data
                                        createHabitdata({
                                            variables: {
                                                amount: 1,
                                                habit_id: section.habit.hab_id,
                                                collected_at: date,
                                            },
                                            onCompleted: (data) => {
                                                toast.show(
                                                    "Habit data created",
                                                    {
                                                        type: "success",
                                                    }
                                                )
                                                section.data.push(data.addHabitdata)
                                            },
                                            onError: (error) => {
                                                toast.show(
                                                    "Error creating habit data: " + error.message,
                                                    {
                                                        type: "danger",
                                                    }
                                                );
                                            }
                                        });
                                    }
                                }}
                                value={dataItem !== undefined}
                            />
                            :
                            <SmallTextFieldInput
                                title="None"
                                masked={false}
                                enabled={index < ALLOWED_BACKDAYS}
                                onChange={(value) => {
                                    let amount = parseFloat(value);

                                    if (isNaN(amount)) {
                                        amount = 0;
                                    }

                                    if (amount <= 0) {
                                        return;
                                    }

                                    if (dataItem) {
                                        performHabitdataUpdate({
                                            variables: {
                                                datId: dataItem ? dataItem.hab_dat_id : "",
                                                amount: amount,
                                            },
                                            onCompleted: (data) => {
                                                toast.show(
                                                    "Habit data updated",
                                                    {
                                                        type: "success",
                                                    }
                                                )
                                                section.data = section.data.map(
                                                    (dataItem: any) => {
                                                        if (dataItem.hab_dat_id === data.updateHabitdata.hab_dat_id) {
                                                            return data.updateHabitdata;
                                                        }

                                                        return dataItem;
                                                    }
                                                );
                                            },
                                            onError: (error) => {
                                                toast.show(
                                                    "Error updating habit data: " + error.message,
                                                    {
                                                        type: "danger",
                                                    }
                                                );
                                            }
                                        });
                                    } else {
                                        createHabitdata({
                                            variables: {
                                                amount: amount,
                                                habit_id: section.habit.hab_id,
                                                collected_at: date,
                                            },
                                            onCompleted: (data) => {
                                                toast.show(
                                                    "Habit data created",
                                                    {
                                                        type: "success",
                                                    }
                                                )
                                                section.data.push(data.addHabitdata)
                                            },
                                            onError: (error) => {
                                                toast.show(
                                                    "Error creating habit data: " + error.message,
                                                    {
                                                        type: "danger",
                                                    }
                                                );
                                            }
                                        });
                                    }
                                }}
                                value={dataItem ? dataItem.hab_dat_amount : ""}
                            />
                    }
                </View>
            </View>
        )
    };

    // Render section content
    const RenderContent = (section: any) => {

        return (
            <View style={styles.accordionBodyContainer}>
                <Spacing size={10} />
                <SmallSeparator />
                <Spacing size={10} />
                <Text style={[
                    styles.smallText,
                    styles.habitDataText
                ]}>
                    Category: {section.category.cat_name}
                </Text>
                <Text style={styles.smallText}>
                    Description: {section.habit.hab_description}
                </Text>
                <View style={styles.datesContainer}>
                    <ScrollView
                        horizontal={true}
                    >
                        {
                            dates.map((date: string, index: number) => {
                                return RenderDay(section, date, index);
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        );
    };

    // Update sections
    const updateSections = (activeSections: any) => {
        setSelected(activeSections);
    };

    return (
        <View style={styles.fullPage}>
            <ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalHabitState.visible}
                    onRequestClose={() => {
                        setModalHabitState({
                            ...modalHabitState,
                            visible: false,
                        });
                        launchHabitsQuery();
                    }}
                >
                    <CreateUpdateHabitView
                        type={modalHabitState.type}
                        onClose={() => {
                            setModalHabitState({
                                ...modalHabitState,
                                visible: false,
                            });
                        }}
                        data={modalHabitState.habit}
                    />
                </Modal>

                <Text style={styles.largeText}>
                    Habits
                </Text>

                <Spacing size={20} />

                <CustomButton
                    title="Add habit"
                    type="secondary"
                    action={() => {
                        setModalHabitState({
                            visible: true,
                            type: "create",
                            habit: null,
                        });
                    }}
                />

                <Separator />

                <Accordion
                    sections={sections}
                    activeSections={selected}
                    renderSectionTitle={() => (<></>)}
                    renderHeader={RenderSectionTitle}
                    renderContent={RenderContent}
                    containerStyle={styles.accordionContainer}
                    sectionContainerStyle={styles.accordionSectionContainer}
                    onChange={updateSections}
                    underlayColor={"transparent"}
                    align="center"
                    expandMultiple={true}
                    duration={0}
                />

            </ScrollView >
        </View >
    );
})