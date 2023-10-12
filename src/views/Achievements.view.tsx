import React, { memo } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';
import Accordion from 'react-native-collapsible/Accordion';

import { createStyles as achievementsStylesBuilder } from '../styles/achievements.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from './../components/Button';
import { Label } from '../components/texts';
import { TextFieldInput } from '../components/inputs';

const CollapsableHabitsContainer = memo(({ habits, chosenHabit }: any) => {
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
                <Text>
                    {selected.length !== 0 ? "Chosen habit: " + chosenHabit.hab_name : "Choose an habit"}
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
                <ScrollView>
                    {
                        habits.map((habit: any) => (
                            <Pressable key={habit.hab_id}>
                                <Text>
                                    {habit.hab_name}
                                </Text>
                            </Pressable>
                        ))
                    }
                </ScrollView>
            </View>
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

const AddAchievementContainer = memo(() => {
    const { theme } = useTheme();

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
                        <Text style={styles.mediumText}>
                            Register an achievement for this habit!
                        </Text>
                        <Label title="Set a name for your habit!" />
                        <TextFieldInput title="Password" masked={true} onChange={
                            (value: string) => setAchievementName(value)
                        } />
                        <CustomButton
                            title="Close"
                            action={() => setModalVisible(false)}
                            type="primary"
                        />
                    </View>
                </View >

            </Modal >
            <Text style={styles.mediumText}>
                Seems like you haven't create an achievement tracker for this habit yet
            </Text>
            <CustomButton
                title="Create achievement tracker"
                action={() => {
                    setModalVisible(true);
                }}
                type="primary"
            />
        </View >
    );
});

export const AchievementsView = React.memo(() => {
    const [habit, setHabit] = React.useState<any>({ hab_id: "" });
    const [achievement, setAchievement] = React.useState<any>({ ach_id: "" });
    const [milestones, setMilestones] = React.useState<any[]>([]);

    const { theme } = useTheme();
    const styles = {
        ...achievementsStylesBuilder(theme),
        ...textStylesBuilder(theme)
    };

    // Get habits every time the component is rendered
    const { data: habitData, error: habitError, loading: habitLoading } = useQuery(graphql.USER_HABITS);

    // Fetch achievements on habit change
    const [fetchAchievements, { data: achievementData, error: achievementError, loading: achievementLoading }] = useLazyQuery(
        graphql.HABIT_ACHIEVEMENTS,
        {
            variables: { id: habit.hab_id },
            onCompleted: (data: any) => {
                const achievement = data.achievementsByHabit.data[0];
                if (achievement) {
                    setAchievement(achievement);
                    fetchMilestones();
                }
            }
        }
    );

    // Fetch milestones on achievement change
    const [fetchMilestones, { data: milestonesData, error: milestonesError, loading: milestonesLoading }] = useLazyQuery(
        graphql.ACHIEVEMENT_MILESTONES,
        {
            variables: { id: achievement.ach_id },
            onCompleted: (data: any) => {
                const milestones = data.milestonesByAchievement.data;
                if (milestones) {
                    setMilestones(milestones);
                }
            }
        }
    );

    if (habitError) return (
        <Text>
            {habitError.message}
            {habitError.graphQLErrors.map(({ message }, i) => (
                message + "\n"
            ))}
            Error! {habitError.clientErrors.join(' ')}
        </Text>
    );

    if (habitLoading) return (
        <LoadingView />
    );

    // Get achievement component
    const AchievementComponent = () => {
        if (achievementLoading) return (
            <LoadingView />
        );

        if (achievementData) return (
            <View style={styles.achievementsContainer}>
                <Text style={styles.mediumText}>
                    {achievement.ach_name}
                </Text>
                <Text style={styles.mediumText}>
                    Current streak: {achievement.currentStreak}
                </Text>
                <Text style={styles.mediumText}>
                    Max streak: {achievement.maxStreak}
                </Text>
            </View>
        );

        if (achievementError) return (
            <View style={styles.achievementsContainer}>
                <Text style={styles.mediumText}>
                    {achievementError.message}
                </Text>
            </View>
        );

        if (habit.hab_id === "") return (
            <View style={styles.achievementsContainer}>
                <Text style={styles.mediumText}>
                    No habit chosen
                </Text>
            </View>
        );

        return (
            <AddAchievementContainer />
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
                        milestones.map((milestone: any) => (
                            <View key={milestone.date}>
                                <Text style={styles.mediumText}>
                                    {milestone.date}
                                </Text>
                                <Text style={styles.mediumText}>
                                    {milestone.streak}
                                </Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );

        if (milestonesError) return (
            <View style={styles.milestonesContainer}>
                <Text style={styles.mediumText}>
                    {milestonesError.message}
                </Text>
            </View>
        );

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
            <CollapsableHabitsContainer
                habits={habitData.habitsByUser}
                chosenHabit={habit}
                onHabitChange={(habit: any) => {
                    setHabit(habit);
                    fetchAchievements();
                }}
            />
            <AchievementComponent />
            <MilestonesComponent />

        </View >
    );
});