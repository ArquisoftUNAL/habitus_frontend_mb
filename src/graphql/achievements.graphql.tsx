import { gql } from '@apollo/client';

const HABIT_ACHIEVEMENTS = gql`
    query HabitAchievements (
        $id: String!
    ) {
        achievementsByHabit(
            id: $id
        ) {
            data {
                currentStreak
                highestStreak
                name
                id
            }
        }
    }
`;

const ADD_ACHIEVEMENT = gql`
    mutation AddAchievement (
        $name: String!
        $habit_id: String!
    ) {
        addAchievement (
            achievement: {
                name: $name
                habId: $habit_id
                currentStreak: 0
                highestStreak: 0
            }
        ) {
            message
        }
    }
`;

const ACHIEVEMENT_MILESTONES = gql`
    query AchievementsMilestones (
        $id: String!
    ) {
        milestonesByAchievement(
            id: $id
        ) {
            data {
                streak
                date
                id
            }
        }
    }
`;

export default { HABIT_ACHIEVEMENTS, ACHIEVEMENT_MILESTONES, ADD_ACHIEVEMENT };