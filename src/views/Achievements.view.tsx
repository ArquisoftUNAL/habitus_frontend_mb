import React, { memo, useEffect } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import Accordion from 'react-native-collapsible/Accordion';
import { useToast } from "react-native-toast-notifications";

import { createStyles as achievementsStylesBuilder } from '../styles/achievements.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from './../components/Button';
import { Label } from '../components/texts';
import { TextFieldInput } from '../components/inputs';
import { GraphQLError } from '../components/GraphQLError';
import { Separator } from '../components/Separator';
import { Spacing } from '../components/Spacing';

const CollapsableHabitsContainer = memo(({ habits, chosenHabit, onHabitChange }: any) => {

    const [selected, setSelected] = React.useState<any[]>([]);
    const { theme } = useTheme();

    const styles = {
        ...achievementsStylesBuilder(theme),
        ...textStylesBuilder(theme)
    };

    // Define sections (there is only one)
    const sections = [{}];

    const renderSectionTitle = () => {
        return (
            <View>
                <Text style={styles.smallText}>
                    {(chosenHabit?.hab_name) ?
                        "Chosen habit: " + chosenHabit.hab_name : "Choose an habit"
                    }
                </Text>
            </View>
        );
    }

    const updateSections = (activeSections: any) => {
        setSelected(activeSections);
    }

    const renderContent = () => {
        return (
            <View>
                <Separator />
                <ScrollView>
                    {
                        habits.map((habit: any) => {
                            return (
                                <Pressable
                                    key={habit.hab_id}
                                    onPress={() => {
                                        onHabitChange(habit);
                                    }}
                                >
                                    <Text style={styles.habitText}>
                                        {habit.hab_name}
                                    </Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </View >
        );
    }

    return (
        <Accordion
            sections={sections}
            activeSections={selected}
            renderSectionTitle={() => (<></>)}
            renderHeader={renderSectionTitle}
            renderContent={renderContent}
            onChange={updateSections}
            containerStyle={styles.habitsContainer}
            sectionContainerStyle={styles.habitItem}
            underlayColor={"transparent"}
            align="center"
            duration={100}
        />
    );
});

interface AddAchievementContainerProps {
    addAchievementMutation: any;
    habit: any;
    onCreation: () => void;
}

const AddAchievementContainer = memo<AddAchievementContainerProps>(({ addAchievementMutation, habit, onCreation }) => {
    const { theme } = useTheme();
    const toast = useToast();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [achievementName, setAchievementName] = React.useState("");

    const styles = {
        ...achievementsStylesBuilder(theme),
        ...textStylesBuilder(theme)
    };

    return (
        <View style={styles.achievementsContainer}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >

                <View style={styles.addAchievementContainer}>

                    <View style={styles.modalView}>
                        <ScrollView>
                            <Text style={styles.mediumText}>
                                Register an achievement for this habit!
                            </Text>
                            <Text style={styles.smallText}>
                                Set a cool achievement name
                            </Text>
                            <TextFieldInput title="Achievement name" masked={false} onChange={
                                (value: string) => setAchievementName(value)
                            } value={achievementName} />
                            <Separator />
                            <CustomButton
                                title="Let's go!"
                                action={() => {
                                    addAchievementMutation(
                                        {
                                            variables: {
                                                name: achievementName,
                                                habit_id: habit.hab_id
                                            },
                                            onCompleted: (data: any) => {
                                                setModalVisible(false);
                                                toast.show(
                                                    "Achievement created!",
                                                    { type: "success" }
                                                );
                                                onCreation();
                                            },
                                            onError: (error: any) => {
                                                setModalVisible(false);
                                                toast.show(
                                                    "Error creating achievement",
                                                    { type: "danger" }
                                                );
                                            }
                                        }
                                    );
                                }}
                                type="primary"

                            />
                            <Spacing size={10} />
                            <CustomButton
                                title="Close"
                                action={() => setModalVisible(false)}
                                type="secondary"

                            />
                        </ScrollView>
                    </View>

                </View >


            </Modal >
            <Text style={styles.smallText}>
                Seems like you haven't created an achievement tracker for this habit yet
            </Text>
            <CustomButton
                title="Create achievement tracker"
                action={() => {
                    setModalVisible(true);
                }}
                type="primary"
                fontSize={theme.fontSizes.small}
            />
        </View >
    );
});

export const AchievementsView: React.FC = () => {
    const [habit, setHabit] = React.useState<any>({ hab_id: "" });
    const [achievement, setAchievement] = React.useState<any>({ ach_id: "" });
    const [milestones, setMilestones] = React.useState<any[]>([]);

    const { theme } = useTheme();
    const toast = useToast();

    const styles: any = {
        ...achievementsStylesBuilder(theme),
        ...textStylesBuilder(theme)
    };

    // Get habits every time the component is rendered
    const { data: habitData, error: habitError, loading: habitLoading } = useQuery(graphql.USER_HABITS);

    // Fetch achievements on habit change
    const [fetchAchievements, { data: achievementData, error: achievementError, loading: achievementLoading }] = useLazyQuery(
        graphql.HABIT_ACHIEVEMENTS
    );

    // Fetch milestones on achievement change
    const [fetchMilestones, { data: milestonesData, error: milestonesError, loading: milestonesLoading }] = useLazyQuery(
        graphql.ACHIEVEMENT_MILESTONES
    );

    // Create achievements
    const [addAchievement, _] = useMutation(
        graphql.ADD_ACHIEVEMENT
    );

    const updateAchievements = () => {
        if (habit.hab_id === "") return;
        fetchAchievements(
            {
                variables: { id: habit.hab_id },
                onCompleted: (data: any) => {
                    const achievement = data.achievementsByHabit.data[0];
                    if (achievement) {
                        setAchievement(achievement);
                        fetchMilestones(
                            {
                                variables: { id: achievement.id },
                                onCompleted: (data: any) => {
                                    const milestones = data.milestonesByAchievement.data;
                                    if (milestones) {
                                        setMilestones(milestones);
                                    } else {
                                        setMilestones([]);
                                    }
                                },
                                onError: (error: any) => {
                                    console.log(JSON.stringify(error));
                                    toast.show(
                                        "Error fetching milestones",
                                        { type: "danger" }
                                    );
                                    setMilestones([]);
                                }
                            }
                        );
                    } else {
                        setAchievement({ ach_id: "" });
                        setMilestones([]);
                    }
                },
                onError: (error: any) => {
                    console.log(JSON.stringify(error));
                    toast.show(
                        "Error fetching milestones",
                        { type: "danger" }
                    );
                    setAchievement({ ach_id: "" });
                    setMilestones([]);
                }
            }
        );
    }

    useEffect(() => {
        updateAchievements();
    }, [habit]);

    if (habitError) {
        console.log(JSON.stringify(habitError));
        return (
            <GraphQLError error={habitError} />
        )
    };

    if (habitLoading) return (
        <LoadingView />
    );

    // Get achievement component
    const AchievementComponent = () => {
        if (achievementLoading) return (
            <LoadingView />
        );

        if (achievementError) {
            return (<GraphQLError error={achievementError} />);
        };

        if (habit.hab_id === "") return (
            <View style={styles.achievementsContainer}>
                <Text style={styles.mediumText}>
                    No habit chosen
                </Text>
            </View>
        );

        if (achievementData) {
            const foundAchievement = achievementData.achievementsByHabit.data[0];

            if (!foundAchievement) return (
                <AddAchievementContainer
                    addAchievementMutation={addAchievement}
                    habit={habit}
                    onCreation={() => {
                        updateAchievements();
                    }}
                />
            );

            return (
                <View style={styles.achievementsContainer}>
                    <Text style={styles.mediumText}>
                        Achievement
                    </Text>
                    <Text style={styles.smallText}>
                        Name: {achievement.name}
                    </Text>
                    <Text style={styles.smallText}>
                        Current streak: {achievement.currentStreak}
                    </Text>
                    <Text style={styles.smallText}>
                        Max streak: {achievement.highestStreak}
                    </Text>
                </View>
            );
        }

        return (
            <AddAchievementContainer
                addAchievementMutation={addAchievement}
                habit={habit}
                onCreation={() => {
                    updateAchievements();
                }}
            />
        );

    }

    // Get milestones component
    const MilestonesComponent = () => {
        if (milestonesLoading) return (
            <LoadingView />
        );

        if (milestonesData) return (
            <View style={styles.milestonesContainer}>
                <Text style={styles.mediumText}>
                    Milestones
                </Text>
                <ScrollView>
                    {
                        milestones.length > 0 ?
                            milestones.map((milestone: any) => (
                                <View key={milestone.id}>
                                    <Text style={styles.smallText}>
                                        Date: {milestone.date}
                                    </Text>
                                    <Text style={styles.smallText}>
                                        Streak achieved: {milestone.streak}
                                    </Text>
                                </View>
                            ))
                            :
                            <Text style={styles.smallText}>
                                No milestones yet
                            </Text>
                    }
                </ScrollView>
            </View>
        );

        if (milestonesError) {
            console.log(JSON.stringify(milestonesError));
            return (
                <GraphQLError error={milestonesError} />
            );
        }

        if (achievement.ach_id === "") return (
            <View style={styles.milestonesContainer}>
                <Text style={styles.mediumText}>
                    No achievement chosen
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>

            <Text style={styles.largeText} numberOfLines={3}>
                Achievements and Milestones
            </Text>

            <ScrollView>
                <CollapsableHabitsContainer
                    habits={habitData.habitsByUser}
                    chosenHabit={habit}
                    onHabitChange={(habit: any) => {
                        console.log("Habit", habit)
                        setHabit(habit);
                    }}
                />
                <AchievementComponent />
                <MilestonesComponent />
            </ScrollView>
        </View >
    );
};