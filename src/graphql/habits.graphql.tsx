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

const USER_HABITS_FULL_DATA = gql`
    query UserHabitsCategories(
        $habits_page: Int!
        $habits_per_page: Int!
        $categories_page: Int!
        $categories_per_page: Int!
        $habits_data_page: Int!
        $habits_data_per_page: Int!
        $start_date: String!
        $end_date: String!
    ) {
        habitsByUser(
            page: $habits_page
            per_page: $habits_per_page
        ) {
            hab_id
            cat_id
            hab_name
            hab_description
            hab_is_yn
        }

        habitdataByUser(
            start_date: $start_date
            end_date: $end_date
            page: $habits_data_page
            per_page: $habits_data_per_page
        ) {
            hab_dat_id
            hab_dat_amount
            hab_dat_collected_at
            hab_id
        }

        categories(
            page: $categories_page
            per_page: $categories_per_page
        ) {
            cat_id
            cat_name
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

export default { USER_HABITS, ADD_HABIT, USER_HABITS_FULL_DATA };