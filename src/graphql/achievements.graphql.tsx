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
                maxStreak
                name
            }
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
            }
        }
    }
`;

export default { HABIT_ACHIEVEMENTS, ACHIEVEMENT_MILESTONES };