import { gql } from '@apollo/client';

const ADD_HABIT_DATA = gql`
    mutation UserHabits (
        $amount: Float!
        $habit_id: String!
        $collected_at: String
    ) {
        addHabitdata (
            data: {
                amount: $amount
                habit_id: $habit_id
                collected_at: $collected_at
            }
        ) {
            data {
                hab_id
                hab_dat_id
                hab_dat_amount
                hab_dat_collected_at
            }
        }
    }
`;

const UPDATE_HABIT_DATA = gql`
    mutation UpdateHabit (
        $datId: String!
        $amount: Float
    ) {
        updateHabitdata (
            datId: $datId
            data: {
                amount: $amount
            }
         ) {
            data {
                hab_dat_id
                hab_dat_amount
                hab_dat_collected_at
                hab_id   
            }
        }
    }
`;

const DELETE_HABIT_DATA = gql`
    mutation DeleteHabit (
        $datId: String!
    ) {
        deleteHabitdata (
            datId: $datId
        ) {
            message
        }
    }
`;

export default { ADD_HABIT_DATA, UPDATE_HABIT_DATA, DELETE_HABIT_DATA };