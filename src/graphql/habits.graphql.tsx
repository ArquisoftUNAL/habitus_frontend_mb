import { gql } from '@apollo/client';

const USER_HABITS = gql`
    query UserHabits {
        habitsByUser {
            hab_id
            hab_name
            hab_is_yn
            hab_description
        }
    }
`;

const ADD_HABIT = gql`
    mutation CreateHabit (
        $name: String!
        $description: String!
        $is_favorite: Boolean!
        $is_yn: Boolean!
        $color: String!
        $goal: Float!
        $units: String!
        $frequency_type: String!
        $category: String!
    ) {
        addHabit (
            habit: {
                name: $name
                description: $description
                is_yn: $is_yn
                color: $color
                goal: $goal
                units: $units
                frequency_type: $frequency_type
                category: $category
            }
        )
    }
`;

export default { USER_HABITS, ADD_HABIT };